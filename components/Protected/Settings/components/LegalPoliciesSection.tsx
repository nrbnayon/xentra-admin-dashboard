"use client";

import React from "react";
import { Eye } from "lucide-react";
import TranslatedText from "@/components/Shared/TranslatedText";

interface LegalPoliciesSectionProps {
  onOpenTerms: () => void;
  onOpenRules: () => void;
}

export default function LegalPoliciesSection({
  onOpenTerms,
  onOpenRules,
}: LegalPoliciesSectionProps) {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-[6px_6px_54px_0px_rgba(0,0,0,0.05)]">
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#1F2937] mb-1">
            <TranslatedText text="Legal/Policies" />
          </h2>
          <p className="text-sm text-[#4B5563] font-medium">
            <TranslatedText text="Manage your rules and conditions" />
          </p>
        </div>

        <div className="space-y-6 pt-6 border-t border-gray-100">
          {/* Terms and Condition Item */}
          <div
            className="flex items-center justify-between group cursor-pointer"
            onClick={onOpenTerms}
          >
            <div>
              <h3 className="text-sm font-bold text-[#1F2937] group-hover:text-primary transition-colors">
                <TranslatedText text="Terms and Condition" />
              </h3>
              <p className="text-xs text-[#4B5563] font-medium mt-1">
                <TranslatedText text="Manage your teams and condition from here" />
              </p>
            </div>
            <button className="p-2 text-gray-400 group-hover:text-primary transition-all pointer-events-none">
              <Eye className="w-5 h-5" />
            </button>
          </div>

          {/* Contest Rules Item */}
          <div
            className="flex items-center justify-between group cursor-pointer"
            onClick={onOpenRules}
          >
            <div>
              <h3 className="text-sm font-bold text-[#1F2937] group-hover:text-primary transition-colors">
                <TranslatedText text="Contest Rules" />
              </h3>
              <p className="text-xs text-[#4B5563] font-medium mt-1">
                <TranslatedText text="Manage your contest rules from here" />
              </p>
            </div>
            <button className="p-2 text-gray-400 group-hover:text-primary transition-all pointer-events-none">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
