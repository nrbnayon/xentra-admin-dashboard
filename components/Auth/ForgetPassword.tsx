"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { forgetPasswordValidationSchema } from "@/lib/formDataValidation";
import { CountryDropdown } from "./CountryDropdown";
import { COUNTRIES } from "@/lib/countries";
import { cn } from "@/lib/utils";

type FormValues = z.infer<typeof forgetPasswordValidationSchema>;

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find((c) => c.code === "HT") || COUNTRIES[0],
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(forgetPasswordValidationSchema),
    defaultValues: {
      phone_number: "",
      country_code: "HT",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      // Simulation
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const fullPhoneNumber = `${selectedCountry.dial}${data.phone_number}`;
      console.log("Phone for reset:", fullPhoneNumber);

      toast.success("OTP sent to your phone number.");
      router.push(
        `/verify-otp?flow=reset&phone=${encodeURIComponent(data.phone_number)}&country=${data.country_code}`,
      );
    } catch (error) {
      console.error("Failed to send OTP:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:flex-1 h-screen overflow-hidden relative bg-[#E6F4FF]"
      >
        <div className="w-full h-full flex items-center justify-center p-20">
          <div className="relative w-full h-full max-w-2xl">
            <Image
              src="/auth/forget-password.svg"
              alt="Security Illustration"
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
        <div className="w-full max-w-xl space-y-10">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-primary">Forget Password</h1>
            <p className="text-base text-gray-500">
              Enter you phone number to change your password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                      "h-14 rounded-xl border-gray-200 focus-visible:ring-0 focus-visible:border-primary px-4 text-base shadow-none",
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

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-xl font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
