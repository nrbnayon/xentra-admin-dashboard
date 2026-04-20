"use client";

import React, { useRef, useState } from "react";
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
  const [isDragging, setIsDragging] = useState(false);
  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const validateFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload JPG, PNG or WEBP.");
      return false;
    }

    if (file.size > maxSize) {
      toast.error("File is too large. Max size is 5MB.");
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    if (!validateFile(file)) return;

    // 1. Create a local preview URL for instant feedback
    const localPreviewUrl = URL.createObjectURL(file);
    setAccountInfo((prev: any) => ({
      ...prev,
      image: localPreviewUrl,
    }));

    const formData = new FormData();
    formData.append("file", file);

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

      let errorMessage = "Failed to update avatar";
      if (error.data?.detail) {
        if (typeof error.data.detail === "string") {
          errorMessage = error.data.detail;
        } else if (Array.isArray(error.data.detail)) {
          errorMessage =
            error.data.detail[0]?.msg || JSON.stringify(error.data.detail[0]);
        } else if (typeof error.data.detail === "object") {
          errorMessage =
            error.data.detail.message || JSON.stringify(error.data.detail);
        }
      } else if (error.data?.message) {
        errorMessage = error.data.message;
      }

      toast.error(errorMessage);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (isEditing) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (!isEditing) {
      toast.info("Please click the edit icon to change your profile image.");
      return;
    }

    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
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
          <div className="pb-8 border-b border-gray-100">
            <div className="flex flex-col items-center">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isDragging ? "scale-110" : ""
                }`}
                onClick={() => isEditing && fileInputRef.current?.click()}
              >
                <div
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 flex items-center justify-center shrink-0 transition-all duration-300 relative ${
                    isDragging
                      ? "border-primary border-dashed bg-primary/5"
                      : "border-primary/10 group-hover:border-primary/30"
                  }`}
                >
                  <Image
                    key={accountInfo.image}
                    src={accountInfo.image || "/images/user.webp"}
                    alt="Profile"
                    width={128}
                    height={128}
                    className={`w-full h-full object-cover rounded-full transition-all duration-300 ${
                      isDragging ? "opacity-40" : isEditing ? "group-hover:opacity-40" : ""
                    }`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        accountInfo.name || "User"
                      )}&background=random&size=128`;
                    }}
                  />

                  {/* Drag & Drop / Upload Overlay */}
                  {isEditing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                      <div className="bg-white/90 p-2 rounded-full shadow-lg mb-2">
                        <Camera className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-[10px] font-bold text-white bg-primary px-2 py-0.5 rounded-full shadow-sm">
                        <TranslatedText text="UPLOAD" />
                      </span>
                    </div>
                  )}

                  {/* Dragging Active Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] flex items-center justify-center">
                      <Camera className="w-8 h-8 text-primary animate-bounce" />
                    </div>
                  )}
                </div>

                {/* Floating Edit Badge */}
                {isEditing && (
                  <div className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="mt-4 text-center space-y-3">
                <h3 className="text-sm font-bold text-[#1F2937]">
                  <TranslatedText text="Profile Image" />
                </h3>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageUpload}
                  aria-label="Upload Profile Image"
                />

                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={!isEditing}
                      className="flex items-center gap-2 px-6 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      aria-label="Change Profile Image"
                    >
                      <Camera className="w-4 h-4" />
                      <TranslatedText text="Change Image" />
                    </button>
                    {accountInfo.image !== "/images/user.webp" && (
                      <button
                        onClick={handleRemoveImage}
                        disabled={!isEditing}
                        className="flex items-center gap-2 px-6 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        aria-label="Remove Profile Image"
                      >
                        <Trash2 className="w-4 h-4" />
                        <TranslatedText text="Remove" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] text-[#4B5563] font-bold uppercase tracking-widest">
                      JPG, PNG, WEBP (MAX 5MB)
                    </p>
                    {isEditing && (
                      <p className="text-[9px] text-primary/60 font-medium mt-1">
                        <TranslatedText text="DRAG & DROP SUPPORTED" />
                      </p>
                    )}
                  </div>
                </div>
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
