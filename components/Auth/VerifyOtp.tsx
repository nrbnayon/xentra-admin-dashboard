"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { toast } from "sonner";
import { otpValidationSchema } from "@/lib/formDataValidation";

type FormValues = z.infer<typeof otpValidationSchema>;

const VerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(41);
  const router = useRouter();
  const searchParams = useSearchParams();
  const flow = searchParams.get("flow") || "signup";
  const phone = searchParams.get("phone") || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(otpValidationSchema),
    defaultValues: {
      otp: "",
    },
  });

  // Simple countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (!phone) {
      toast.error("Phone number not found. Please try again from the start.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulation of sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Resending OTP to:", phone);

      toast.success(`A new code has been sent to ${phone}`);
      setCountdown(60); // Reset timer
    } catch (error) {
      console.error("Resend failed:", error);
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("OTP:", data.otp);

      toast.success("Verification successful!");

      if (flow === "reset") {
        document.cookie =
          "reset_verified=true; path=/; max-age=300; SameSite=Strict";
        router.push("/reset-password");
      } else {
        router.push("/signin");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:flex-1 h-screen bg-[#E6F4FF] relative"
      >
        <div className="w-full h-full flex items-center justify-center p-20">
          <div className="relative w-full h-full max-w-2xl">
            <Image
              src="/auth/verify-otp.png"
              alt="Verify OTP Illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="top-[-200px] lg:top-[-373px] left-[-150px] lg:left-[-257px] absolute w-[600px] lg:w-[850px] h-[350px] lg:h-[496px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
        <div className="bottom-[-200px] lg:bottom-[-92px] right-[-150px] lg:right-[-267px] absolute w-[200px] lg:w-[850px] h-[100px] lg:h-[150px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
      </motion.div>

      {/* Right - Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white"
      >
        <div className="w-full max-w-md space-y-10">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-primary">Enter OTP</h1>
            <p className="text-base text-gray-500">
              We have sent you a 6digit code to your phone number
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10 flex flex-col items-center"
          >
            <div className="w-full flex justify-center">
              <Controller
                control={control}
                name="otp"
                render={({ field }) => (
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2 sm:gap-3">
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className="w-12 h-14 sm:w-14 sm:h-16 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 text-2xl font-bold text-primary"
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </div>
            {errors.otp && (
              <p className="text-sm text-destructive">{errors.otp.message}</p>
            )}

            <div className="w-full">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>

            {/* Resend Link */}
            <div className="text-center text-sm sm:text-base">
              <span className="text-gray-500 font-medium">
                Didn&apos;t get OTP?{" "}
              </span>
              <button
                type="button"
                onClick={handleResend}
                disabled={countdown > 0 || isLoading}
                className="text-primary font-bold hover:underline transition-colors disabled:opacity-70 disabled:no-underline cursor-pointer"
              >
                {countdown > 0
                  ? `Resent in 00:${countdown.toString().padStart(2, "0")}`
                  : "Resent"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
