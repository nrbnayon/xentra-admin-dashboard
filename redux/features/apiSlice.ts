// redux/features/apiSlice.ts
// Base RTK Query slice with:
//   - Cookie-based token storage (no localStorage)
//   - Auto token refresh on 401 with mutex guard
//   - Security-safe cookie attributes
//
// All auth endpoints inject into this slice via authApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import type { RootState } from "../store";
import type { RefreshTokenApiResponse } from "@/types/auth.types";

// ─── Cookie helpers ───────────────────────────────────────────────────────────
// No js-cookie dependency — raw document.cookie only.
// Tokens are stored in cookies so Next.js middleware (proxy.ts) can read them
// server-side for route protection.

const IS_PROD = process.env.NODE_ENV === "production";

export const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
};

export const setCookie = (
  name: string,
  value: string,
  expiresAt?: number, // Unix ms timestamp — pass access_token_valid_till directly
): void => {
  if (typeof document === "undefined") return;
  const encoded = encodeURIComponent(value);
  const secure = IS_PROD ? "; Secure" : "";
  const sameSite = "; SameSite=Strict";
  const path = "; path=/";
  const expiry = expiresAt
    ? `; expires=${new Date(expiresAt).toUTCString()}`
    : "";
  document.cookie = `${name}=${encoded}${expiry}${path}${sameSite}${secure}`;
};

export const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

// ─── Token storage interface ──────────────────────────────────────────────────
export const tokenStorage = {
  getAccessToken: () => getCookie("accessToken"),
  getRefreshToken: () => getCookie("refreshToken"),
  getUserRole: () => getCookie("userRole"),

  // Called on successful login — sets all three cookies at once
  setAll: (
    accessToken: string,
    refreshToken: string,
    role: string,
  ) => {
    const refreshExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    const accessExpiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours
    setCookie("accessToken", accessToken, accessExpiry);
    setCookie("refreshToken", refreshToken, refreshExpiry);
    // userRole cookie uses same expiry as access token
    // proxy.ts reads this cookie for route protection
    setCookie("userRole", role, accessExpiry);
  },

  // Called on refresh — updates tokens
  updateTokens: (accessToken: string, refreshToken: string, role?: string) => {
    const accessExpiry = Date.now() + 12 * 60 * 60 * 1000; // 12 hours
    const refreshExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
    setCookie("accessToken", accessToken, accessExpiry);
    setCookie("refreshToken", refreshToken, refreshExpiry);
    if (role) {
      setCookie("userRole", role, accessExpiry);
    } else {
      setCookie("userRole", getCookie("userRole") ?? "", accessExpiry);
    }
  },

  // Called on logout or auth failure
  clearAll: () => {
    ["accessToken", "refreshToken", "userRole"].forEach(deleteCookie);
  },
};

// ─── Mutex — prevents race condition on concurrent 401s ──────────────────────
// Without this, 3 simultaneous 401s would fire 3 refresh calls.
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

// ─── Base query ───────────────────────────────────────────────────────────────
const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://10.10.12.62:6005",
  prepareHeaders: (headers, { getState }) => {
    // Prefer Redux state token (most up-to-date after refresh),
    // fall back to cookie (covers page-refresh rehydration)
    const stateToken = (getState() as RootState).auth.user
      ? tokenStorage.getAccessToken()
      : null;
    const token = stateToken ?? tokenStorage.getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    // Do NOT set Content-Type for FormData — browser sets it with boundary
    if (!headers.get("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

// ─── Base query with auto-refresh ─────────────────────────────────────────────
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) return result;

  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    // No refresh token — hard logout
    tokenStorage.clearAll();
    const { logout } = await import("../features/authSlice");
    api.dispatch(logout());
    return result;
  }

  if (isRefreshing) {
    // Another call is already refreshing — wait for it to finish
    return new Promise((resolve) => {
      subscribeTokenRefresh(async () => {
        result = await rawBaseQuery(args, api, extraOptions);
        resolve(result);
      });
    });
  }

  isRefreshing = true;

  // POST /auth/refresh-token with Bearer refresh token
  // API body field is "refresh_token"
  const refreshResult = await rawBaseQuery(
    {
      url: "/auth/refresh-token",
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken}` }, // or without Bearer depending on API. Standard is Bearer
      body: { refresh_token: refreshToken },
    },
    api,
    extraOptions,
  );

  const refreshData = refreshResult.data as RefreshTokenApiResponse | undefined;

  if ((refreshData?.status === "success" || refreshData?.success) && refreshData?.data?.access_token) {
    const { access_token, refresh_token, user_role } = refreshData.data;

    // Update cookies
    tokenStorage.updateTokens(access_token, refresh_token, user_role);

    // Update Redux state
    const { loginSuccess } = await import("../features/authSlice");
    api.dispatch(loginSuccess(refreshData.data));

    // Notify all waiting requests
    onTokenRefreshed(access_token);
    isRefreshing = false;

    // Retry original request
    result = await rawBaseQuery(args, api, extraOptions);
  } else {
    // Refresh failed — hard logout
    isRefreshing = false;
    refreshSubscribers = [];
    tokenStorage.clearAll();
    const { logout } = await import("../features/authSlice");
    api.dispatch(logout());
  }

  return result;
};

// ─── Root API slice ───────────────────────────────────────────────────────────
// All feature APIs inject their endpoints here via .injectEndpoints()
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile"],
  endpoints: () => ({}),
});
