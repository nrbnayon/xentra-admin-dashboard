"use client";

import React, { useState } from "react";
import { Eye, EyeOff, PencilLine } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { toast } from "sonner";

interface SecuritySectionProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export default function SecuritySection({
  isEditing,
  setIsEditing,
}: SecuritySectionProps) {
  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdatePassword = () => {
    if (!securityInfo.currentPassword) {
      toast.error("Current password is required");
      return;
    }
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsEditing(false);
    setSecurityInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Password updated successfully");
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-1">
              <TranslatedText text="Security" />
            </h2>
            <p className="text-sm text-[#4B5563] font-medium">
              <TranslatedText text="Manage password and security settings" />
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
            >
              <PencilLine className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100">
          {isEditing ? (
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Current Password" />
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    value={securityInfo.currentPassword}
                    onChange={(e) =>
                      setSecurityInfo({
                        ...securityInfo,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                  />
                  <button
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1F2937]">
                    <TranslatedText text="New Password" />
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter New Password"
                      value={securityInfo.newPassword}
                      onChange={(e) =>
                        setSecurityInfo({
                          ...securityInfo,
                          newPassword: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                    />
                    <button
                      onClick={() => setShowNewPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1F2937]">
                    <TranslatedText text="Confirm New Password" />
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter Password"
                      value={securityInfo.confirmPassword}
                      onChange={(e) =>
                        setSecurityInfo({
                          ...securityInfo,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none pr-12"
                    />
                    <button
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleUpdatePassword}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
                >
                  <TranslatedText text="Update Password" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#1F2937]">
                <TranslatedText text="Current Password" />
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#4B5563] font-medium tracking-widest">
                  *********
                </p>
                <button
                  className="text-gray-300 hover:text-gray-400 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  <EyeOff className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
