"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { toast } from "sonner";
import { useGetProfileQuery, useUpdatePoliciesMutation, useGetPoliciesQuery } from "@/redux/services/authApi";

// Separate Components
import AccountInformation from "./components/AccountInformation";
import SecuritySection from "./components/SecuritySection";
import LanguageSection from "./components/LanguageSection";
import LegalPoliciesSection from "./components/LegalPoliciesSection";
import PolicyModal from "./components/PolicyModal";
import { useAppDispatch } from "@/redux/hooks";
import { setProfile } from "@/redux/features/authSlice";

export default function SettingsClient() {
  const dispatch = useAppDispatch();
  // Section Edit Modes
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isEditingLanguage, setIsEditingLanguage] = useState(false);

  // Policy Modals States
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [isEditingRules, setIsEditingRules] = useState(false);
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);

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
        image: apiProfile.profile_photo || apiProfile.file || "/images/user.webp",
        name: apiProfile.full_name || "",
        email: apiProfile.email || "",
        phone: apiProfile.phone || "",
        address: apiProfile.address || "",
      });
      // Sync global auth state
      dispatch(setProfile(apiProfile));
    }
  }, [apiProfile, dispatch]);

  // Setting the actual content back for completeness
  const fullTerms = `1. Eligibility
• You must be 18 years or older to use XENTRA.
• By registering, you confirm you meet the legal age.

2. Account Registration
• Registration is completed using your phone number.
• You are responsible for keeping your login information secure.
• Each person is allowed only one account.
• XENTRA reserves the right to suspend or close accounts involved in fraud, abuse, or suspicious activity.

3. Nature of the Platform
• XENTRA is a skill-based sports prediction platform operated by Xentra Sports.
• Participants compete against other players by predicting match outcomes as exact scores.
• Contest rankings are determined based on prediction accuracy and performance.
• Contest outcomes depend on participant skill, knowledge, and analysis of sporting events.
• All contests are entertainment-based competitions designed for sports fans.
• XENTRA does not provide betting odds and is not a sportsbook.

4. Wallet & Payments
• A platform service fee is deducted from contest entry fees.
• The remaining amount forms the contest prize pool that is distributed to qualifying winners.

5. Platform Fees
• A service fee is deducted before distributing prizes.
• The remaining amount forms the prize pool.

6. Winners & Rankings
• XENTRA is committed to maintaining a fair and competitive environment for all participants.
• Users must participate honestly and respect the integrity of the platform and its contests.
Activities prohibited:
• Manipulating contest results or attempting to influence outcomes unfairly
• Creating or using multiple accounts
• Using another person’s identity or account
• Colluding with other users to gain an unfair advantage
• Exploiting software bugs, technical errors, or system vulnerabilities
• Using automated tools, bots, or scripts to participate in contests
• Engaging in any fraudulent or abusive behavior

7. Fair Play
Any attempt to manipulate results, abuse the system, use multiple accounts, or exploit technical errors may result in:
• Account suspension
• Loss of funds
• Permanent ban

8. No Profit Guarantee
• Participation in contests involves risk and does not guarantee winnings.
• Prizes are awarded only to top-ranked participants based on contest results.
• XENTRA does not guarantee profits or financial gains from participation.

9. Service Availability
• XENTRA may modify or suspend services at any time.

10. Changes to Conditions
• These conditions may change at any time.
• Continued use of the app indicates acceptance of changes.

11. Contact
• For assistance, contact XENTRA through the app.

12. Platform Operator
• XENTRA is a digital platform operated by Xentra Sports.
• The platform provides skill-based sports prediction contests where participants compete for prizes based on prediction accuracy.

13. Withdrawal Processing
• Withdrawal requests are subject to review and verification by the platform.
• XENTRA processes withdrawal requests within 24 to 48 hours after approval.
• In certain cases, additional verification may be required before withdrawals are completed.
• XENTRA reserves the right to delay or refuse withdrawals if suspicious or fraudulent activity is detected.`;

  const fullRules = `1. Qualification
• Players must be 18 years or older to participate.

2. How to Participate
Each contest requires players to:
• Choose the team they think will win (Team A / Team B / Draw).
• Predict the exact final score of the match

3. Ranking System
Rankings are determined as follows:
• Exact score + correct winning team = highest score.
If no player predicts the exact score, rankings are based on the closest difference, using this formula:
• (|Predicted Team A score – Actual Team A score| + |Predicted Team B score – Actual Team B score|)
• The smallest total difference gives the best rank.

4. Payment Structure
• Only the Top 5 players for each match receive payment.
• The distribution of payments is based on the position in the ranking.

5. Prize Fund
• The total prize fund is calculated after deducting platform service fees.
• The remaining amount is distributed to the qualifying winners.

6. Jackpot Rules
• If no participant correctly predicts the exact final score of a match, the contest winners will be determined based on the closest score prediction according to the ranking rules.
• If no qualifying predictions meet the criteria defined by the platform, XENTRA reserves the right to roll over the remaining prize pool to a future contest or jackpot.
• The platform may also apply the rollover to selected upcoming matches or special contests.
• Rolled-over prize pools may increase the total prize available in future contests.

7. Match Results
• The administrator enters official results after the match ends.
• Rankings are automatically calculated based on the final results.

8. Wallet Updates
• Wallet balances are automatically updated once results are confirmed.

9. Fraud & Abuse
XENTRA reserves the right to suspend or close accounts involved in:
• Fraud
• Collusion
• System abuse
• Manipulation of contests

10. Nature of Contests
• All contests on XENTRA are skill-based precision competitions where players compete against each other.
• Contest outcomes are determined by precision accuracy and ranking performance.
• XENTRA contests are not sports betting activities.

11. Special & Featured Contests
• XENTRA may organize special or featured contests for selected matches, tournaments, or promotional events.
• These contests may include increased prize pools, promotional rewards, or special conditions.
• Details of each featured contest, including entry requirements and prize distribution, will be displayed within the contest before participation.
• By entering a featured contest, participants agree to the specific rules and prize structure displayed for that contest.`;

  const fullPrivacy = `Last Updated: March 04, 2026

1. Information We Collect
XENTRA collects necessary information to provide our skill-based prediction services:
• Phone Number: Used for account identification and security.
• Display Name: To identify you on leaderboards.
• Device Information: To ensure platform integrity and prevent fraud.
• Transaction History: Keeping track of your wallet activities.

2. How We Use Your Data
Your data is used specifically for:
• Authenticating and securing your account.
• Processing wallet deposits and withdrawals.
• Calculating and displaying contest rankings.
• Improving app features and user experience.

3. Data Security
• We use industry-standard encryption and security protocols to protect your information.
• Your phone number is never shared with third parties for marketing purposes.

4. User Rights & Account Deletion
You have full control over your data. You can request a summary of the data we hold or request its permanent removal.

To Permanently Delete Your Account & Data:
1. Open the XENTRA app
2. Go to Profile Settings
3. Select 'Delete Account'
4. Confirm the deletion
Please note: Account deletion is permanent and will result in the loss of all wallet balances and history.

5. Compliance
XENTRA complies with applicable data protection regulations. We do not participate in unauthorized data sharing or selling.

6. Contact Us
If you have any questions regarding your privacy, please contact our support team:
• Email: support@xentrasports.com`;

  const [currentTerms, setCurrentTerms] = useState(fullTerms);
  const [currentRules, setCurrentRules] = useState(fullRules);
  const [currentPrivacy, setCurrentPrivacy] = useState(fullPrivacy);

  const { data: policiesData } = useGetPoliciesQuery();
  const [updatePolicies] = useUpdatePoliciesMutation();

  useEffect(() => {
    if (policiesData?.data) {
      if (policiesData.data.terms_and_conditions) {
        setCurrentTerms(policiesData.data.terms_and_conditions);
      }
      if (policiesData.data.contest_rules) {
        setCurrentRules(policiesData.data.contest_rules);
      }
      if (policiesData.data.privacy_policy) {
        setCurrentPrivacy(policiesData.data.privacy_policy);
      }
    }
  }, [policiesData]);

  const handleUpdatePolicy = async (type: "terms" | "rules" | "privacy", content: string) => {
    try {
      const payload: any = {};
      if (type === "terms") payload.terms_and_conditions = content;
      if (type === "rules") payload.contest_rules = content;
      if (type === "privacy") payload.privacy_policy = content;

      await updatePolicies(payload).unwrap();
      
      if (type === "terms") setIsEditingTerms(false);
      if (type === "rules") setIsEditingRules(false);
      if (type === "privacy") setIsEditingPrivacy(false);
      
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully`);
    } catch (error: any) {
      console.error(`Failed to update ${type}:`, error);
      toast.error(`Failed to update ${type}`);
    }
  };

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
          onOpenPrivacy={() => setIsPrivacyModalOpen(true)}
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
        onSave={() => handleUpdatePolicy("terms", currentTerms)}
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
        onSave={() => handleUpdatePolicy("rules", currentRules)}
      />

      {/* Privacy Modal */}
      <PolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => {
          setIsPrivacyModalOpen(false);
          setIsEditingPrivacy(false);
        }}
        title="Privacy Policy"
        description="Update your Privacy Policy details"
        content={currentPrivacy}
        setContent={setCurrentPrivacy}
        isEditing={isEditingPrivacy}
        setIsEditing={setIsEditingPrivacy}
        onSave={() => handleUpdatePolicy("privacy", currentPrivacy)}
      />
    </div>
  );
}
