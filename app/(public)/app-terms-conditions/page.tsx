import React from "react";
import { Metadata } from "next";
import legalData from "@/data/legal.json";

export const metadata: Metadata = {
  title: `${legalData.termsConditions.title} | Xentra Sports`,
  description: `Terms and Conditions for Xentra Sports application.`,
};

export default function AppTermsConditionsPage() {
  const { termsConditions } = legalData;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{termsConditions.title}</h1>
        <p className="text-slate-500 mb-8">Effective Date: {termsConditions.effectiveDate}</p>

        <div className="prose prose-slate max-w-none space-y-8">
          {termsConditions.sections.map((section) => (
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

              {section.prohibitedActivities && (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mt-4">
                  <h3 className="font-bold text-slate-800 mb-3">Strictly Prohibited Activities:</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600 text-sm">
                    {section.prohibitedActivities.map((activity, idx) => (
                      <li key={idx}>• {activity}</li>
                    ))}
                  </ul>
                </div>
              )}

              {section.consequences && (
                <ul className="list-disc pl-6 space-y-1 text-slate-600 mt-2">
                  {section.consequences.map((consequence, idx) => (
                    <li key={idx}>{consequence}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
