
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Xentra Sports",
  description: "Privacy Policy for Xentra Sports application.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last Updated: March 04, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Information We Collect</h2>
            <p className="text-slate-600 mb-4">
              XENTRA collects necessary information to provide our skill-based prediction services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Phone Number:</strong> Used for account identification and security.</li>
              <li><strong>Display Name:</strong> To identify you on leaderboards.</li>
              <li><strong>Device Information:</strong> To ensure platform integrity and prevent fraud.</li>
              <li><strong>Transaction History:</strong> Keeping track of your wallet activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. How We Use Your Data</h2>
            <p className="text-slate-600 mb-4">
              Your data is used specifically for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Authenticating and securing your account.</li>
              <li>Processing wallet deposits and withdrawals.</li>
              <li>Calculating and displaying contest rankings.</li>
              <li>Improving app features and user experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Data Security</h2>
            <p className="text-slate-600">
              We use industry-standard encryption and security protocols to protect your information. 
              Your phone number is never shared with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. User Rights & Account Deletion</h2>
            <p className="text-slate-600 mb-4">
              You have full control over your data. You can request a summary of the data we hold or request its permanent removal.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="text-blue-900 font-bold mb-2">To Permanently Delete Your Account & Data:</h3>
              <ol className="list-decimal pl-6 space-y-1 text-blue-800">
                <li>Open the XENTRA app</li>
                <li>Go to Profile Settings</li>
                <li>Select &apos;Delete Account&apos;</li>
                <li>Confirm the deletion</li>
              </ol>
              <p className="mt-4 text-blue-700 text-sm italic">
                Please note: Account deletion is permanent and will result in the loss of all wallet balances and history.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">5. Compliance</h2>
            <p className="text-slate-600">
              XENTRA complies with applicable data protection regulations. We do not participate in unauthorized data sharing or selling.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">6. Contact Us</h2>
            <p className="text-slate-600 mb-2">
              If you have any questions regarding your privacy, please contact our support team:
            </p>
            <p className="text-primary font-medium">Email: support@xentrasports.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}
