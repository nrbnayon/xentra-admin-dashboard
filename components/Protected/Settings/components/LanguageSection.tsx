"use client";

import React from "react";
import { ChevronDown, PencilLine } from "lucide-react";
import { useLanguage, Language } from "@/context/LanguageContext";
import TranslatedText from "@/components/Shared/TranslatedText";
import { toast } from "sonner";

interface LanguageSectionProps {
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
}

export default function LanguageSection({
  isEditing,
  setIsEditing,
}: LanguageSectionProps) {
  const { language, setLanguage } = useLanguage();

  const handleSaveLanguage = () => {
    setIsEditing(false);
    toast.success(
      `Language set to ${
        language === "en"
          ? "English"
          : language === "fr"
            ? "French"
            : "Haitian Kreyòl"
      }`,
    );
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-[#1F2937] mb-1">
              <TranslatedText text="Language" />
            </h2>
            <p className="text-sm text-[#4B5563] font-medium">
              <TranslatedText text="Manage your language settings" />
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
                  <TranslatedText text="Selected Language" />
                </label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ht">Haitian Kreyòl</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveLanguage}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
                >
                  <TranslatedText text="Save Changes" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-bold text-[#1F2937]">
                <TranslatedText text="Selected Language" />
              </p>
              <p className="text-sm text-[#4B5563] font-medium">
                {language === "en"
                  ? "English"
                  : language === "fr"
                    ? "French"
                    : "Haitian Kreyòl"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
