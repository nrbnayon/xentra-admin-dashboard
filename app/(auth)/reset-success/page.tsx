"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function ResetSuccessPage() {
  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row overflow-hidden bg-white">
      {/* Left - Image (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block lg:flex-1 h-screen overflow-hidden relative bg-[#E6F4FF]"
      >
        <div className="w-full h-full flex items-center justify-center p-20">
          <div className="relative w-full h-full max-w-2xl">
            <Image
              src="/auth/success.svg"
              alt="Auth Background"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="top-[-200px] lg:top-[-373px] left-[-150px] lg:left-[-257px] absolute w-[600px] lg:w-[850px] h-[350px] lg:h-[496px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
        <div className="bottom-[-200px] lg:bottom-[-92px] right-[-150px] lg:right-[-267px] absolute w-[200px] lg:w-[850px] h-[100px] lg:h-[150px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
      </motion.div>

      {/* Right - Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white lg:min-h-screen"
      >
        <div className="w-full max-w-2xl space-y-12 text-center">
          {/* Success Icon Animation */}
          <div className="flex justify-center">
            <div
              className="relative flex items-center justify-center w-64 h-64 rounded-full"
              style={{ backgroundColor: "#E6F3FE99" }}
            >
              <div
                className="flex items-center justify-center w-44 h-44 rounded-full"
                style={{ backgroundColor: "#B0DAFA66" }}
              >
                <div className="flex items-center justify-center w-24 h-24 rounded-full bg-primary shadow-lg">
                  <Check className="w-12 h-12 text-white stroke-[4px]" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-primary tracking-tight">
              Congratulations!
            </h1>
            <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
              Password Reset successful! You&apos;ll be redirected to the sign
              in screen now
            </p>
          </div>

          <div className="pt-6">
            <Button
              asChild
              className="w-full max-w-sm h-14 bg-primary hover:bg-primary/90 text-white text-xl font-bold rounded-full shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
