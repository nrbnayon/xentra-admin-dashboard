import React from "react";
import { Metadata } from "next";
import legalData from "@/data/legal.json";

export const metadata: Metadata = {
  title: `${legalData.privacyPolicy.title} | Xentra Sports`,
  description: `Privacy Policy for Xentra Sports application.`,
};

export default function AppPrivacyPolicyPage() {
  const { privacyPolicy } = legalData;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{privacyPolicy.title}</h1>
        <p className="text-slate-500 mb-8">Last Updated: {privacyPolicy.lastUpdated}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          {privacyPolicy.sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
              {section.content && <p className="text-slate-600 mb-4">{section.content}</p>}
              
              {section.items && (
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  {section.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}

              {section.deletionSteps && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-4">
                  <h3 className="text-blue-900 font-bold mb-2">To Permanently Delete Your Account & Data:</h3>
                  <ol className="list-decimal pl-6 space-y-1 text-blue-800">
                    {section.deletionSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                  {section.deletionNote && (
                    <p className="mt-4 text-blue-700 text-sm italic">
                      {section.deletionNote}
                    </p>
                  )}
                </div>
              )}

              {section.email && (
                <p className="text-primary font-medium mt-2">Email: {section.email}</p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
