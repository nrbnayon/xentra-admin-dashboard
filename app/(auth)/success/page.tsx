"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="relative h-screen w-full flex flex-col lg:flex-row">
      {/* Left - Image (hidden on mobile) */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block lg:flex-1 h-screen overflow-hidden bg-[#E6F4FF] relative"
      >
        <div className="w-full h-full flex items-center justify-center">
          <Image
            src="/auth/success.png"
            alt="Auth Background"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
        <div className="top-[-200px] lg:top-[-373px] left-[-150px] lg:left-[-257px] absolute w-[600px] lg:w-[850px] h-[350px] lg:h-[496px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
        <div className="bottom-[-200px] lg:bottom-[-92px] right-[-150px] lg:right-[-267px] absolute w-[200px] lg:w-[850px] h-[100px] lg:h-[150px] bg-[#1d92ed99] rounded-[300px/175px] lg:rounded-[425px/248px] blur-[100px]" />
      </motion.div>

      {/* Right - Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white lg:min-h-screen"
      >
        <div className="w-full max-w-md lg:max-w-lg space-y-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <Image
              src="/auth/success.svg"
              alt="Xandra Logo"
              width={140}
              height={140}
              className="w-28 sm:w-36 h-auto"
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              Congratulations!
            </h1>
            <p className="text-lg sm:text-xl text-secondary max-w-sm mx-auto">
              Your account has been created successfully. Log in to explore
              more.
            </p>
          </div>

          <div className="pt-4">
            <Button
              asChild
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-200 truncate"
            >
              <Link href="/signin">Log In</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
