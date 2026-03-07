import { z } from "zod";
import { parsePhoneNumberFromString, CountryCode } from "libphonenumber-js";

// Phone Number Validation helper
const validatePhoneNumber = (phone: string, countryCode?: string) => {
  try {
    const phoneNumber = parsePhoneNumberFromString(
      phone,
      countryCode as CountryCode,
    );
    return phoneNumber?.isValid() || false;
  } catch {
    return false;
  }
};

// Login Validation schema
export const loginValidationSchema = z
  .object({
    phone_number: z.string().min(1, "Phone number is required"),
    country_code: z.string().min(1, "Country code is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(2, "Password must be at least 2 characters")
      .max(100, "Password must be less than 100 characters")
      .trim()
      .refine((val) => !/\s/.test(val), {
        message: "Password cannot contain spaces",
      }),
    rememberMe: z.boolean(),
  })
  .refine((data) => validatePhoneNumber(data.phone_number, data.country_code), {
    message: "Please enter a valid phone number",
    path: ["phone_number"],
  });

// Sign up Validation schema (Keeping it but user didn't mention it, though they said a-z)
export const signupValidationSchema = z
  .object({
    full_name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Name can only contain letters, spaces, hyphens, and apostrophes",
      )
      .trim(),
    phone_number: z.string().min(1, "Phone number is required"),
    country_code: z.string().min(1, "Country code is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .refine((val) => !/\s/.test(val), {
        message: "Password cannot contain spaces",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the Terms and Conditions to continue",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => validatePhoneNumber(data.phone_number, data.country_code), {
    message: "Please enter a valid phone number",
    path: ["phone_number"],
  });

// Forget Password Validation schema
export const forgetPasswordValidationSchema = z
  .object({
    phone_number: z.string().min(1, "Phone number is required"),
    country_code: z.string().min(1, "Country code is required"),
  })
  .refine((data) => validatePhoneNumber(data.phone_number, data.country_code), {
    message: "Please enter a valid phone number",
    path: ["phone_number"],
  });

// Reset Password Validation schema
export const resetPasswordValidationSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .refine((val) => !/\s/.test(val), {
        message: "New password cannot contain spaces",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// OTP Validation schema
export const otpValidationSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

// Email Validation schema (Keeping it for compatibility if needed elsewhere, but might not be)
export const emailValidationSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters")
    .trim(),
});

// Change Password Validation schema
export const passwordValidationSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required").trim(),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be less than 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .refine((val) => !/\s/.test(val), {
        message: "New password cannot contain spaces",
      }),
    confirmPassword: z
      .string()
      .min(1, "Please confirm your password")
      .refine((val) => !/\s/.test(val), {
        message: "Confirm password cannot contain spaces",
      }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
