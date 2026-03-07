"use client";

import React, { useState, useRef } from "react";
import {
  Eye,
  EyeOff,
  ChevronDown,
  PencilLine,
  Camera,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import Image from "next/image";
import { useLanguage, Language } from "@/context/LanguageContext";
import TranslatedText from "@/components/Shared/TranslatedText";

export default function SettingsClient() {
  const { language, setLanguage } = useLanguage();
  // Section Edit Modes
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [isEditingRules, setIsEditingRules] = useState(false);

  // Form States
  const [accountInfo, setAccountInfo] = useState({
    image: "/images/user.webp",
    name: "Nayon II",
    email: "example@gmail.com",
    phone: "000-0000-000",
    address: "123 Admin Street, Dhaka",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAccountInfo({ ...accountInfo, image: reader.result as string });
        toast.success("Profile image updated");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setAccountInfo({ ...accountInfo, image: "/images/user.webp" });
    toast.info("Profile image removed");
  };

  const [securityInfo, setSecurityInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveAccount = () => {
    setIsEditingAccount(false);
    toast.success("Account information updated");
  };

  const handleUpdatePassword = () => {
    if (securityInfo.newPassword !== securityInfo.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsEditingSecurity(false);
    setSecurityInfo({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Password updated successfully");
  };

  const [termsContent, setTermsContent] = useState(`1. Eligibility
- You must be 18 years or older to use XENTRA.
- By registering, you confirm you meet the legal age.

2. Account Registration
- Registration is completed using your phone number.
- You are responsible for keeping your login information secure.
- Each person is allowed only one account.
- XENTRA reserves the right to suspend or close accounts involved in fraud, abuse, or suspicious activity.

3. Nature of the Platform
- XENTRA is a skill-based prediction platform, not a traditional sportsbook.
- Users participate in contests with a shared prize pool.
- XENTRA does not provide betting odds.

4. Wallet & Payments
- Deposits are made via MonCash or Natcash.
- Wallet funds are used only within the app.
- Withdrawals are subject to verification.
- XENTRA may delay or cancel withdrawals if fraud is suspected.

5. Platform Fees
- A service fee is deducted before distributing prizes.
- The remaining amount forms the prize pool.

6. Winners & Rankings
- Winners are determined based on prediction accuracy.
- Only the top players receive payouts.
- Detailed rules are in the Contest Rules section.

7. Fair Play
Any attempt to:
- Manipulate results
- Abuse the system
- Use multiple accounts
- Exploit technical errors
May result in:
- Account suspension
- Loss of funds
- Permanent ban

8. No Profit Guarantee
- Participation involves risk.
- XENTRA does not guarantee profits.

9. Service Availability
- XENTRA may modify or suspend services at any time.

10. Changes to Conditions
- These conditions may change at any time.
- Continued use of the app indicates acceptance of changes.

11. Contact
- These conditions may change at any time.
- For assistance, contact XENTRA through the app.`);

  const [rulesContent, setRulesContent] = useState(`1. Qualification
- Players must be 18 years or older to participate.

2. How to Participate
Each contest requires players to:
- Choose the team they think will win (Team A / Team B / Draw).
- Predict the exact final score of the match

3. Ranking System
Rankings are determined as follows:
- Exact score + correct winning team = highest score.
- If no player predicts the exact score, rankings are based on the closest difference, using this formula:
- (|Predicted Team A score – Actual Team A score| + |Predicted Team B score – Actual Team B score|)
- The smallest total difference gives the best rank.

4. Payment Structure
- Only the Top 5 players for each match receive payment.
- The distribution of payments is based on the position in the ranking.

5. Prize Fund
- The total prize fund is calculated after deducting platform service fees.
- The remaining amount is distributed to the qualifying winners.

6. Jackpot Rules
If no player predicts the exact score:
- The prize fund may be transferred to the next qualifying match as a jackpot.

7. Match Results
- The administrator enters official results after the match ends.
- Rankings are automatically calculated based on the final results.

8. Wallet Updates
- Wallet balances are automatically updated once results are confirmed.

9. Fraud & Abuse
XENTRA reserves the right to suspend or close accounts involved in:
- Fraud
- Collusion
- System abuse
- Manipulation of contests

10. Nature of Contests
- All contests on XENTRA are skill-based prediction games and are not sports betting.
- By participating, you agree to these Contest Rules.`);

  const handleSaveTerms = () => {
    setIsEditingTerms(false);
    toast.success("Terms & Conditions updated");
  };

  const handleSaveRules = () => {
    setIsEditingRules(false);
    toast.success("Contest Rules updated");
  };

  const handleSaveLanguage = () => {
    setIsEditingLanguage(false);
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
    <div className="pb-10">
      <DashboardHeader
        title="Settings"
        description="Manage your account and application preferences"
      />

      <main className="px-4 md:px-8 space-y-6 mx-auto animate-in fade-in duration-500 mt-5">
        {/* Account Information Section */}
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
              {!isEditingAccount && (
                <button
                  onClick={() => setIsEditingAccount(true)}
                  className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
                >
                  <PencilLine className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              {/* Profile Image Section */}
              <div className="pb-6 border-b border-gray-100">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden border-2 border-primary/20 p-1 flex items-center justify-center shrink-0">
                      <Image
                        src={accountInfo.image}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    {isEditingAccount && (
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
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={!isEditingAccount}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-bold hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Camera className="w-4 h-4" />
                        <TranslatedText text="Change Image" />
                      </button>
                      <button
                        onClick={handleRemoveImage}
                        disabled={
                          !isEditingAccount ||
                          accountInfo.image === "/images/user.webp"
                        }
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                        <TranslatedText text="Remove" />
                      </button>
                    </div>
                    <p className="text-[10px] text-[#4B5563] font-medium uppercase tracking-wider">
                      JPG, PNG, WEBP (MAX 2MB)
                    </p>
                  </div>
                </div>
              </div>

              {isEditingAccount ? (
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1F2937]">
                      <TranslatedText text="Full Name" />
                    </label>
                    <input
                      type="text"
                      value={accountInfo.name}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          name: e.target.value,
                        })
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
                      value={accountInfo.email}
                      disabled
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-500 cursor-not-allowed transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1F2937]">
                      <TranslatedText text="Phone Number" />
                    </label>
                    <input
                      type="text"
                      value={accountInfo.phone}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          phone: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1F2937]">
                      <TranslatedText text="Address" />
                    </label>
                    <input
                      type="text"
                      value={accountInfo.address}
                      onChange={(e) =>
                        setAccountInfo({
                          ...accountInfo,
                          address: e.target.value,
                        })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleSaveAccount}
                      className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 cursor-pointer"
                    >
                      <TranslatedText text="Save Changes" />
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
                      {accountInfo.name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#1F2937]">
                      <TranslatedText text="Email Address" />
                    </p>
                    <p className="text-sm text-[#4B5563] font-medium">
                      {accountInfo.email}
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
                      <TranslatedText text={accountInfo.address} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Section */}
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
              {!isEditingSecurity && (
                <button
                  onClick={() => setIsEditingSecurity(true)}
                  className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
                >
                  <PencilLine className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              {isEditingSecurity ? (
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
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
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
                          onClick={() => setShowNewPassword(!showNewPassword)}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
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
                    <button className="text-gray-300 hover:text-gray-400 cursor-pointer">
                      <EyeOff className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Language Section */}
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
              {!isEditingLanguage && (
                <button
                  onClick={() => setIsEditingLanguage(true)}
                  className="p-2 text-gray-400 hover:text-primary transition-all cursor-pointer"
                >
                  <PencilLine className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              {isEditingLanguage ? (
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#1F2937]">
                      <TranslatedText text="Selected Language" />
                    </label>
                    <div className="relative">
                      <select
                        value={language}
                        onChange={(e) =>
                          setLanguage(e.target.value as Language)
                        }
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

        {/* Legal/Policies Section */}
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
                onClick={() => setIsTermsModalOpen(true)}
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
                onClick={() => setIsRulesModalOpen(true)}
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
      </main>

      {/* Terms and Conditions Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              setIsTermsModalOpen(false);
              setIsEditingTerms(false);
            }}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">
                  <TranslatedText text="Terms and Conditions" />
                </h2>
                <p className="text-sm text-[#4B5563] font-medium">
                  <TranslatedText text="Update your terms and condition details" />
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {isEditingTerms ? (
                <textarea
                  value={termsContent}
                  onChange={(e) => setTermsContent(e.target.value)}
                  className="w-full h-full min-h-[400px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none font-sans"
                />
              ) : (
                <div className="space-y-4 text-sm text-[#4B5563] font-medium whitespace-pre-wrap leading-relaxed">
                  {termsContent}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 border-t border-gray-100 flex gap-4">
              <button
                onClick={() => {
                  setIsTermsModalOpen(false);
                  setIsEditingTerms(false);
                }}
                className="flex-1 py-4 px-6 border border-gray-200 rounded-full font-bold text-[#4B5563] hover:bg-gray-50 transition-all cursor-pointer"
              >
                <TranslatedText text="Cancel" />
              </button>
              {isEditingTerms ? (
                <button
                  onClick={handleSaveTerms}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <TranslatedText text="Save" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingTerms(true)}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <TranslatedText text="Edit" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Contest Rules Modal */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => {
              setIsRulesModalOpen(false);
              setIsEditingRules(false);
            }}
          />
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col">
            <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">
                  <TranslatedText text="Contest Rules" />
                </h2>
                <p className="text-sm text-[#4B5563] font-medium">
                  <TranslatedText text="Update your Contest Rules details" />
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {isEditingRules ? (
                <textarea
                  value={rulesContent}
                  onChange={(e) => setRulesContent(e.target.value)}
                  className="w-full h-full min-h-[400px] p-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none resize-none font-sans"
                />
              ) : (
                <div className="space-y-4 text-sm text-[#4B5563] font-medium whitespace-pre-wrap leading-relaxed">
                  {rulesContent}
                </div>
              )}
            </div>

            <div className="p-6 md:p-8 border-t border-gray-100 flex gap-4">
              <button
                onClick={() => {
                  setIsRulesModalOpen(false);
                  setIsEditingRules(false);
                }}
                className="flex-1 py-4 px-6 border border-gray-200 rounded-full font-bold text-[#4B5563] hover:bg-gray-50 transition-all cursor-pointer"
              >
                <TranslatedText text="Cancel" />
              </button>
              {isEditingRules ? (
                <button
                  onClick={handleSaveRules}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <TranslatedText text="Save" />
                </button>
              ) : (
                <button
                  onClick={() => setIsEditingRules(true)}
                  className="flex-1 py-4 px-6 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 cursor-pointer"
                >
                  <TranslatedText text="Edit" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
