// redux/services/authApi.ts
// All auth endpoints injected into the root apiSlice.
// URLs and body field names match the real API exactly.

import { apiSlice } from "../features/apiSlice";
import type {
  LoginRequest,
  LoginApiResponse,
  ForgotPasswordRequest,
  ForgotPasswordApiResponse,
  VerifyResetCodeRequest,
  VerifyResetCodeApiResponse,
  ResetPasswordRequest,
  ResetPasswordApiResponse,
  ResendOtpRequest,
  ResendOtpApiResponse,
  RefreshTokenRequest,
  RefreshTokenApiResponse,
  ProfileApiResponse,
  UpdateProfileRequest,
  UpdateProfileApiResponse,
  ChangePasswordRequest,
  ChangePasswordApiResponse,
  UpdateAvatarApiResponse,
} from "@/types/auth.types";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // ── 1. Login ──────────────────────────────────────────────────────────────
    login: builder.mutation<LoginApiResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    // ── 2. Forgot Password ────────────────────────────────────────────────────
    forgotPassword: builder.mutation<
      ForgotPasswordApiResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // ── 3. Resend OTP ─────────────────────────────────────────────────────────
    resendVerificationCode: builder.mutation<
      ResendOtpApiResponse,
      ResendOtpRequest
    >({
      query: (body) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    // ── 4. Verify OTP ─────────────────────────────────────────────────────────
    verifyResetCode: builder.mutation<
      VerifyResetCodeApiResponse,
      VerifyResetCodeRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password-verify-otp",
        method: "POST",
        body,
      }),
    }),

    // ── 5. Reset Password ─────────────────────────────────────────────────────
    resetPassword: builder.mutation<
      ResetPasswordApiResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    // ── 6. Refresh Token ──────────────────────────────────────────────────────
    refreshToken: builder.mutation<
      RefreshTokenApiResponse,
      RefreshTokenRequest
    >({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST", // changed from GET to POST as it accepts body
        body,
      }),
    }),

    // ── 7. Get Profile ────────────────────────────────────────────────────────
    getProfile: builder.query<ProfileApiResponse, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
 
    // ── 8. Update Profile ─────────────────────────────────────────────────────
    updateProfile: builder.mutation<UpdateProfileApiResponse, UpdateProfileRequest>(
      {
        query: (body) => ({
          url: "/users/me/profile",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Profile"],
      },
    ),
 
    // ── 9. Change Password ────────────────────────────────────────────────────
    changePassword: builder.mutation<
      ChangePasswordApiResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: "/users/me/password",
        method: "PUT",
        body,
      }),
    }),

    // ── 10. Update Avatar ─────────────────────────────────────────────────────
    updateAvatar: builder.mutation<UpdateAvatarApiResponse, FormData>({
      query: (body) => ({
        url: "/users/me/avatar",
        method: "POST",
        body,
        // FormData headers are handled automatically by fetchBaseQuery 
        // if we don't set Content-Type: application/json in apiSlice
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
  useResendVerificationCodeMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUpdateAvatarMutation,
} = authApi;
