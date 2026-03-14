// types/auth.types.ts (strictly typed against actual API responses updated)
// ─── Strictly typed against actual API responses ──────────────────────────────

export type UserRole = "admin" | "user" | "guest" | "creator";

// ─── Generic API wrapper (all endpoints follow this shape) ───────────────────
export interface ApiResponse<T = unknown> {
  success?: boolean;
  status?: string | number;
  message?: string;
  detail?: string;
  mock_otp_hint?: string;
  data?: T;
  errors?: Record<string, unknown>;
  error_code?: string;
}

// ─── 1. Login ─────────────────────────────────────────────────────────────────
export interface LoginRequest {
  phone: string;
  password: string;
}

export interface LoginResponseData {
  access_token: string;
  refresh_token: string;
  user_role: UserRole;
}

export type LoginApiResponse = ApiResponse<LoginResponseData>;

// ─── 2. Forgot Password ───────────────────────────────────────────────────────
export interface ForgotPasswordRequest {
  phone: string;
}

export type ForgotPasswordApiResponse = ApiResponse<null>;

// ─── 3. Resend OTP ────────────────────────────────────────────────────────────
export interface ResendOtpRequest {
  phone: string;
}

export type ResendOtpApiResponse = ApiResponse<null>;

// ─── 4. Verify OTP ────────────────────────────────────────────────────────────
export interface VerifyResetCodeRequest {
  phone: string;
  otp: string;
}

export type VerifyResetCodeApiResponse = ApiResponse<null>;

// ─── 5. Reset Password ────────────────────────────────────────────────────────
export interface ResetPasswordRequest {
  phone: string;
  otp: string;
  new_password: string;
  re_new_password: string;
}

export type ResetPasswordApiResponse = ApiResponse<null>;

// ─── 6. Refresh Token ─────────────────────────────────────────────────────────
export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponseData {
  access_token: string;
  refresh_token: string;
  user_role: UserRole;
}

export type RefreshTokenApiResponse = ApiResponse<RefreshTokenResponseData>;

// ─── 7. Get Profile / Me ──────────────────────────────────────────────────────
export interface ProfileResponseData {
  id: number;
  phone: string;
  full_name: string;
  profile_photo: string | null;
  email: string | null;
  address: string | null;
  is_active: boolean;
  role: UserRole;
  file?: string | null;
  created_at: string;
}

export type ProfileApiResponse = ProfileResponseData;

// ─── 8. Update Profile ──────────────────────────────────────────────────────
export interface UpdateProfileRequest {
  full_name?: string;
  email?: string | null;
  address?: string | null;
  profile_photo?: string | null;
  phone?: string | null;
}

export type UpdateProfileApiResponse = ApiResponse<ProfileResponseData>;

// ─── 9. Change Password ─────────────────────────────────────────────────────
export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export type ChangePasswordApiResponse = ApiResponse<null>;

// ─── 10. Update Avatar ──────────────────────────────────────────────────────
export type UpdateAvatarApiResponse = ApiResponse<ProfileResponseData>;

// ─── Auth State (Redux slice shape) ──────────────────────────────────────────
export interface AuthUser {
  user_id: string; // using string to keep compatibility or stringified ID
  role: UserRole;
  full_name?: string;
  email?: string | null;
  profile_picture?: string | null;
  phone_number?: string | null;
  address?: string | null;
}

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
