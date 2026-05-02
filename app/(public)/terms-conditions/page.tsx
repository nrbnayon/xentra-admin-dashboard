import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Xentra Sports",
  description: "Terms and Conditions for Xentra Sports application.",
};

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Terms & Conditions</h1>
        <p className="text-slate-500 mb-8">Effective Date: March 04, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Eligibility</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>You must be 18 years or older to use XENTRA.</li>
              <li>By registering, you confirm you meet the legal age.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Account Registration</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Registration is completed using your phone number.</li>
              <li>You are responsible for keeping your login information secure.</li>
              <li>Each person is allowed only one account.</li>
              <li>XENTRA reserves the right to suspend or close accounts involved in fraud, abuse, or suspicious activity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Nature of the Platform</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>XENTRA is a skill-based sports prediction platform operated by Xentra Sports.</li>
              <li>Participants compete against other players by predicting match outcomes as exact scores.</li>
              <li>Contest rankings are determined based on prediction accuracy and performance.</li>
              <li>Contest outcomes depend on participant skill, knowledge, and analysis of sporting events.</li>
              <li>All contests are entertainment-based competitions designed for sports fans.</li>
              <li>XENTRA does not provide betting odds and is not a sportsbook.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Wallet & Payments</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>A platform service fee is deducted from contest entry fees.</li>
              <li>The remaining amount forms the contest prize pool that is distributed to qualifying winners.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Platform Fees</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>A service fee is deducted before distributing prizes.</li>
              <li>The remaining amount forms the prize pool.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Winners & Rankings</h2>
            <p className="text-slate-600 mb-4">
              XENTRA is committed to maintaining a fair and competitive environment for all participants. 
              Users must participate honestly and respect the integrity of the platform and its contests.
            </p>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-3">Strictly Prohibited Activities:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 text-sm">
                <li>• Manipulating contest results</li>
                <li>• Creating multiple accounts</li>
                <li>• Using another person&apos;s identity</li>
                <li>• Colluding with other users</li>
                <li>• Exploiting software bugs</li>
                <li>• Using automated tools or bots</li>
                <li>• Fraudulent or abusive behavior</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">7. Fair Play</h2>
            <p className="text-slate-600 mb-4">Any attempt to manipulate results or abuse the system may result in:</p>
            <ul className="list-disc pl-6 space-y-1 text-slate-600">
              <li>Account suspension</li>
              <li>Loss of funds</li>
              <li>Permanent ban</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">8. No Profit Guarantee</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Participation in contests involves risk and does not guarantee winnings.</li>
              <li>Prizes are awarded only to top-ranked participants based on contest results.</li>
              <li>XENTRA does not guarantee profits or financial gains from participation.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">9. Service Availability</h2>
            <p className="text-slate-600">XENTRA may modify or suspend services at any time.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">10. Withdrawal Processing</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Withdrawal requests are subject to review and verification by the platform.</li>
              <li>XENTRA processes withdrawal requests within 24 to 48 hours after approval.</li>
              <li>In certain cases, additional verification may be required before withdrawals are completed.</li>
              <li>XENTRA reserves the right to delay or refuse withdrawals if suspicious or fraudulent activity is detected.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">11. Changes to Conditions</h2>
            <p className="text-slate-600">
              These conditions may change at any time. Continued use of the app indicates acceptance of changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">12. Contact</h2>
            <p className="text-slate-600">
              For assistance, contact XENTRA through the app or email support@xentrasports.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
