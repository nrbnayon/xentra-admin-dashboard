// hooks/useUser.ts
// Custom hook — single interface for auth state throughout the app.
// Reads from Redux (source of truth), rehydrates from cookies on first load,
// auto-fetches profile once authenticated, handles logout cleanly.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  loginSuccess,
  logout as logoutAction,
  setProfile,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserRole,
  selectIsAdmin,
} from "@/redux/features/authSlice";
import { tokenStorage } from "@/redux/features/apiSlice";
import { useLazyGetProfileQuery } from "@/redux/services/authApi";
import type { UserRole } from "@/types/auth.types";

// ─── Return shape ─────────────────────────────────────────────────────────────
export interface UseUserReturn {
  // Identity
  userId: string | null;
  fullName: string | null;
  email: string | null;
  name?: string;
  image?: string;
  role: UserRole | null;
  profilePicture: string | null;
  phoneNumber: string | null;
  address: string | null;
  // Auth state
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean; // true during initial cookie rehydration check
  // Actions
  hasRole: (role: UserRole) => boolean;
  logout: () => void;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useUser(): UseUserReturn {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector(selectCurrentUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const role = useAppSelector(selectUserRole);
  const isAdmin = useAppSelector(selectIsAdmin);

  // True only during the first-render cookie-rehydration check
  const [isLoading, setIsLoading] = useState(true);

  // Lazy profile query — fired manually once we confirm authentication
  const [fetchProfile] = useLazyGetProfileQuery();

  // ── Step 1: Rehydrate from cookies on first render ──────────────────────────
  // authSlice.buildInitialState() already does this for user_id + role,
  // but user.full_name / email / profile_picture are not in cookies.
  // We trigger a profile fetch to fill those in.
  useEffect(() => {
    const accessToken = tokenStorage.getAccessToken();
    const userRole = tokenStorage.getUserRole() as UserRole | null;

    if (!isAuthenticated && accessToken && userRole) {
      // Cookies exist but Redux lost state (e.g. hard refresh before slice init)
      // loginSuccess re-sets cookies (no-op since same values) + restores state
      dispatch(
        loginSuccess({
          access_token: accessToken,
          refresh_token: tokenStorage.getRefreshToken() ?? "",
          user_role: userRole,
        }),
      );
    }

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  // ── Step 2: Fetch profile once authenticated ──────────────────────────────
  // We fetch every time this hook mounts while authenticated to ensure 
  // persisted state (from localStorage) is synchronized with the server.
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchProfile()
      .unwrap()
      .then((res) => {
        if (res && res.id) {
          dispatch(setProfile(res));
        }
      })
      .catch((error) => {
        console.error("Failed to sync profile:", error);
      });
  }, [isAuthenticated, fetchProfile, dispatch]);

  // ── Logout ──────────────────────────────────────────────────────────────────
  const logout = () => {
    dispatch(logoutAction()); // clears Redux + cookies via tokenStorage.clearAll()
    router.replace("/signin");
  };

  // ── Role check ───────────────────────────────────────────────────────────────
  const hasRole = (r: UserRole): boolean => user?.role === r;

  // console.log("User from hook:: ", user);

  return {
    userId: user?.user_id ?? null,
    fullName: user?.full_name ?? null,
    name: user?.full_name ?? undefined,
    image: user?.profile_picture ?? undefined,
    email: user?.email ?? null,
    role: role,
    profilePicture: user?.profile_picture ?? null,
    phoneNumber: user?.phone_number ?? null,
    address: user?.address ?? null,
    isAuthenticated,
    isAdmin,
    isLoading,
    hasRole,
    logout,
  };
}
