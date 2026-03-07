// redux/services/authApi.ts
import { apiSlice } from "../features/apiSlice";
import { usersData } from "../../data/usersData";

interface LoginRequest {
  phone_number: string;
  password: string;
  rememberMe?: boolean;
}

interface LoginResponse {
  user: {
    email_address?: string;
    role: string;
    phone_number?: string;
    image?: string;
    full_name?: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface VerifyOtpRequest {
  phone_number: string;
  otp: string;
}

interface VerifyOtpResponse {
  message: string;
  verified: boolean;
}

// Inject endpoints into the API slice
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint (Dummy auth logic)
    login: builder.mutation<LoginResponse, LoginRequest>({
      queryFn: async (credentials) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Find user by phone number or fallback to the first admin user
        const foundUser =
          usersData.find((u) => u.phone_number === credentials.phone_number) ||
          usersData.find((u) => u.role === "admin") ||
          usersData[0];

        return {
          data: {
            user: {
              phone_number: foundUser.phone_number || credentials.phone_number,
              role: foundUser.role,
              full_name: foundUser.name,
              image: foundUser.image,
              email_address: foundUser.email_address,
            },
            accessToken: `mock_access_token_${Date.now()}`,
            refreshToken: `mock_refresh_token_${Date.now()}`,
          },
        };
      },
      invalidatesTags: ["Auth"],
    }),

    // Verify OTP endpoint (Dummy auth logic)
    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      queryFn: async (otpData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Reject all, but accept 123456 or 111111 mock OTP
        if (otpData.otp === "123456" || otpData.otp === "111111") {
          return { data: { message: "OTP Verified", verified: true } };
        }
        return {
          error: {
            status: 400,
            data: { message: "Invalid OTP" },
            name: "Error",
            message: "Invalid OTP",
          },
        };
      },
    }),

    // Logout endpoint (Dummy auth logic)
    logout: builder.mutation<{ message: string }, void>({
      queryFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { data: { message: "Logged out successfully" } };
      },
      invalidatesTags: ["Auth"],
    }),

    // Get current user (Dummy auth logic)
    getCurrentUser: builder.query<LoginResponse["user"], void>({
      queryFn: async () => {
        const adminUser =
          usersData.find((u) => u.role === "admin") || usersData[0];

        return {
          data: {
            phone_number: adminUser.phone_number,
            role: adminUser.role,
            full_name: adminUser.name,
            image: adminUser.image,
            email_address: adminUser.email_address,
          },
        };
      },
      providesTags: ["Auth"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useVerifyOtpMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
