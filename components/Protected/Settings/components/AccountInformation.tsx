"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera, Trash2, PencilLine } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";
import { toast } from "sonner";
import {
  useUpdateProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/services/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setProfile } from "@/redux/features/authSlice";

interface AccountInformationProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  accountInfo: {
    image: string;
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  setAccountInfo: React.Dispatch<React.SetStateAction<any>>;
}

export default function AccountInformation({
  isEditing,
  setIsEditing,
  accountInfo,
  setAccountInfo,
}: AccountInformationProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Create a local preview URL for instant feedback
    const localPreviewUrl = URL.createObjectURL(file);
    setAccountInfo((prev: any) => ({
      ...prev,
      image: localPreviewUrl,
    }));

    const formData = new FormData();
    formData.append("file", file); // Changed from profile_photo to file

    try {
      const result = await updateAvatar(formData).unwrap();
      const updatedPhoto = result?.data?.profile_photo;
      
      if (updatedPhoto) {
        setAccountInfo((prev: any) => ({
          ...prev,
          image: updatedPhoto,
        }));
        // Update global auth state so Sidebar/Header see the change
        if (result?.data) {
          dispatch(setProfile(result.data));
        }
      }
      toast.success("Profile image updated");
    } catch (error: any) {
      console.error("Avatar upload error:", error);
      
      // Handle the 422 error detail if it's an object/array (common in FastAPI)
      let errorMessage = "Failed to update avatar";
      if (error.data?.detail) {
        if (typeof error.data.detail === "string") {
          errorMessage = error.data.detail;
        } else if (Array.isArray(error.data.detail)) {
          errorMessage = error.data.detail[0]?.msg || JSON.stringify(error.data.detail[0]);
        } else if (typeof error.data.detail === "object") {
          errorMessage = error.data.detail.message || JSON.stringify(error.data.detail);
        }
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }

      toast.error(errorMessage);
      
      // We don't revoke the URL here so the local preview persists 
      // even if the server rejected it, letting the user see what happened.
    }
  };

  const handleRemoveImage = () => {
    setAccountInfo((prev: any) => ({ ...prev, image: "/images/user.webp" }));
    toast.info("Profile image removed");
  };

  const handleSave = async () => {
    try {
      const result = await updateProfile({
        full_name: accountInfo.name,
        email: accountInfo.email || null,
        address: accountInfo.address || null,
        phone: accountInfo.phone || null,
      }).unwrap();

      // Sync global state
      if (result?.data) {
        dispatch(setProfile(result.data));
      }

      setIsEditing(false);
      toast.success("Account information updated");
    } catch (error: any) {
      console.error("Profile update error:", error);
      let errorMessage = "Failed to update profile";
      if (error.data?.detail) {
        if (typeof error.data.detail === "string") {
          errorMessage = error.data.detail;
        } else if (Array.isArray(error.data.detail)) {
          errorMessage = error.data.detail[0]?.msg || JSON.stringify(error.data.detail[0]);
        } else if (typeof error.data.detail === "object") {
          errorMessage = error.data.detail.message || JSON.stringify(error.data.detail);
        }
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }
      toast.error(errorMessage);
    }
  };

  // console.log("accountInfo from api call: ", accountInfo);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-1">
              <TranslatedText text="Account Information" />
            </h2>
            <p className="text-sm text-[#4B5563] font-medium">
              <TranslatedText text="Update your account details" />
            </p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              aria-label="Edit Account Information"
              className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
            >
              <PencilLine className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100">
          <div className="pb-6 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-primary/20 p-1 flex items-center justify-center shrink-0">
                  <Image
                    key={accountInfo.image}
                    src={accountInfo.image || "/images/user.webp"}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        accountInfo.name || "User",
                      )}&background=random&size=96`;
                    }}
                  />
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Profile Image" />
                </h3>
                <div className="flex gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    aria-label="Upload Profile Image"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!isEditing}
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Change Profile Image"
                  >
                    <Camera className="w-4 h-4" />
                    <TranslatedText text="Change Image" />
                  </button>
                  <button
                    onClick={handleRemoveImage}
                    disabled={
                      !isEditing || accountInfo.image === "/images/user.webp"
                    }
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Remove Profile Image"
                  >
                    <Trash2 className="w-4 h-4" />
                    <TranslatedText text="Remove" />
                  </button>
                </div>
                <p className="text-[10px] text-[#4B5563] font-medium uppercase tracking-wider">
                  JPG, PNG, WEBP (MAX 5MB)
                </p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Full Name" />
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={accountInfo.name || ""}
                  onChange={(e) =>
                    setAccountInfo((prev: any) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Email Address" />
                </label>
                <input
                  type="email"
                  placeholder="e.g. john@example.com"
                  value={accountInfo.email || ""}
                  onChange={(e) =>
                    setAccountInfo((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Phone Number" />
                </label>
                <input
                  type="text"
                  value={accountInfo.phone || ""}
                  readOnly
                  placeholder="e.g. +1 234 567 890"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-medium text-gray-400 outline-none cursor-not-allowed"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  <TranslatedText text="Phone number cannot be changed" />
                </p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Address" />
                </label>
                <input
                  type="text"
                  placeholder="e.g. Port-au-Prince, Haiti"
                  value={accountInfo.address || ""}
                  onChange={(e) =>
                    setAccountInfo((prev: any) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                  className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                />
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  aria-label="Save Changes"
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <TranslatedText
                    text={isUpdating ? "Saving..." : "Save Changes"}
                  />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Full Name" />
                </p>
                <p className="text-sm text-[#4B5563] font-medium">
                  {accountInfo.name || <span className="text-gray-300 italic">Not set</span>}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Email Address" />
                </p>
                <p className="text-sm text-[#4B5563] font-medium">
                  {accountInfo.email || <span className="text-gray-300 italic">Not set</span>}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Phone Number" />
                </p>
                <p className="text-sm text-[#4B5563] font-medium">
                  {accountInfo.phone}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Address" />
                </p>
                <p className="text-sm text-[#4B5563] font-medium">
                  {accountInfo.address || <span className="text-gray-300 italic">Not set</span>}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
