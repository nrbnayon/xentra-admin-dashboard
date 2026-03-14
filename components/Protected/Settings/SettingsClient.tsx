"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/redux/services/authApi";

// Separate Components
import AccountInformation from "./components/AccountInformation";
import SecuritySection from "./components/SecuritySection";
import LanguageSection from "./components/LanguageSection";
import LegalPoliciesSection from "./components/LegalPoliciesSection";
import PolicyModal from "./components/PolicyModal";

export default function SettingsClient() {
  // Section Edit Modes
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);

  // Policy Modals States
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [isEditingRules, setIsEditingRules] = useState(false);

  // Form States
  const { data: apiProfile, isLoading: isFetching } = useGetProfileQuery();
  const [accountInfo, setAccountInfo] = useState({
    image: "/images/user.webp",
    name: "User",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (apiProfile) {
      setAccountInfo({
        image: apiProfile.profile_photo || "/images/user.webp",
        name: apiProfile.full_name || "",
        email: apiProfile.email || "",
        phone: apiProfile.phone || "",
        address: apiProfile.address || "",
      });
    }
  }, [apiProfile]);

  // Setting the actual content back for completeness
  const fullTerms = `1. Eligibility
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
- For assistance, contact XENTRA through the app.`;

  const fullRules = `1. Qualification
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
- By participating, you agree to these Contest Rules.`;

  const [currentTerms, setCurrentTerms] = useState(fullTerms);
  const [currentRules, setCurrentRules] = useState(fullRules);

  return (
    <div className="pb-10">
      <DashboardHeader
        title="Settings"
        description="Manage your account and application preferences"
      />

      <main className="px-4 md:px-8 space-y-6 mx-auto animate-in fade-in duration-500 mt-5">
        <AccountInformation
          isEditing={isEditingAccount}
          setIsEditing={setIsEditingAccount}
          accountInfo={accountInfo}
          setAccountInfo={setAccountInfo}
        />

        <SecuritySection
          isEditing={isEditingSecurity}
          setIsEditing={setIsEditingSecurity}
        />

        <LanguageSection
          isEditing={isEditingLanguage}
          setIsEditing={setIsEditingLanguage}
        />

        <LegalPoliciesSection
          onOpenTerms={() => setIsTermsModalOpen(true)}
          onOpenRules={() => setIsRulesModalOpen(true)}
        />
      </main>

      {/* Terms Modal */}
      <PolicyModal
        isOpen={isTermsModalOpen}
        onClose={() => {
          setIsTermsModalOpen(false);
          setIsEditingTerms(false);
        }}
        title="Terms and Conditions"
        description="Update your terms and condition details"
        content={currentTerms}
        setContent={setCurrentTerms}
        isEditing={isEditingTerms}
        setIsEditing={setIsEditingTerms}
        onSave={() => {
          setIsEditingTerms(false);
          toast.success("Terms & Conditions updated");
        }}
      />

      {/* Rules Modal */}
      <PolicyModal
        isOpen={isRulesModalOpen}
        onClose={() => {
          setIsRulesModalOpen(false);
          setIsEditingRules(false);
        }}
        title="Contest Rules"
        description="Update your Contest Rules details"
        content={currentRules}
        setContent={setCurrentRules}
        isEditing={isEditingRules}
        setIsEditing={setIsEditingRules}
        onSave={() => {
          setIsEditingRules(false);
          toast.success("Contest Rules updated");
        }}
      />
    </div>
  );
}
