"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { loginValidationSchema } from "@/lib/formDataValidation";
import { CountryDropdown } from "./CountryDropdown";
import { COUNTRIES } from "@/lib/countries";
import { loginSuccess } from "@/redux/features/authSlice";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/services/authApi";

type FormValues = z.infer<typeof loginValidationSchema>;

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.code === "HT") || COUNTRIES[0],
  );

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      phone_number: "",
      country_code: "HT",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // API expects "phone", pass phone_number directly
      // Adjust format if needed by your backend (e.g. including dial code)
      const payload = {
        phone: data.phone_number,
        password: data.password,
      };

      const response = await login(payload).unwrap();

      if (response && response.data) {
        dispatch(loginSuccess(response.data));
        toast.success(response.message || "Logged in successfully!");
        router.push("/");
      } else {
        toast.error(response.message || "Login failed.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.detail || error?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left - Image (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:flex-1 h-screen overflow-hidden relative bg-[#E6F4FF]"
      >
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/icons/logo.png"
            alt="Auth Background"
            width={240}
            height={240}
            className="object-contain"
          />
        </div>
        <div className="top-[-200px] lg:top-[-373px] left-[-150px] lg:left-[-257px] absolute w-[600px] lg:w-[850px] h-[350px] lg:h-[496px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
        <div className="bottom-[-200px] lg:bottom-[-92px] right-[-150px] lg:right-[-267px] absolute w-[200px] lg:w-[850px] h-[100px] lg:h-[150px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
      </motion.div>

      {/* Right - Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white lg:min-h-screen"
      >
        <div className="w-full max-w-xl space-y-10">
          {/* Logo + Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-primary">Sign In</h1>
            <p className="text-base text-gray-500">
              Sign in to access your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone_number"
                className="text-base font-semibold text-primary"
              >
                Phone
              </Label>
              <div className="flex gap-2">
                <CountryDropdown
                  selectedCountry={selectedCountry}
                  onSelect={(country) => {
                    setSelectedCountry(country);
                    setValue("country_code", country.code, {
                      shouldValidate: true,
                    });
                  }}
                  error={!!errors.phone_number}
                />
                <div className="flex-1 relative">
                  <Input
                    id="phone_number"
                    placeholder="Enter your number"
                    className={cn(
                      "h-14 rounded-xl border-gray-200 focus-visible:ring-0 focus-visible:border-primary px-4 text-base",
                      errors.phone_number &&
                        "border-red-500 focus-visible:border-red-500",
                    )}
                    {...register("phone_number")}
                  />
                </div>
              </div>
              {errors.phone_number && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-base font-semibold text-primary"
              >
                Password
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="h-5 w-5" />
                </span>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={cn(
                    "h-14 rounded-xl border-gray-200 focus-visible:ring-0 focus-visible:border-primary pl-12 pr-12 text-base",
                    errors.password &&
                      "border-red-500 focus-visible:border-red-500",
                  )}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me & Forgot Password */}
            <div className="flex items-center justify-between">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      className="h-5 w-5 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-600 cursor-pointer font-medium"
                    >
                      Remember me
                    </Label>
                  </div>
                )}
              />
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-orange-400 hover:text-orange-500 transition-colors"
              >
                Forget Password?
              </Link>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
