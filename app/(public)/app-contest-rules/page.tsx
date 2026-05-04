import { Metadata } from "next";
import legalData from "@/data/legal.json";

export const metadata: Metadata = {
  title: `${legalData.contestRules.title} | Xentra Sports`,
  description: `Contest Rules for Xentra Sports application.`,
};

export default function AppContestRulesPage() {
  const { contestRules } = legalData;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">{contestRules.title}</h1>

        <div className="prose prose-slate max-w-none space-y-8">
          {contestRules.sections.map((section) => (
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

              {section.footer && (
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mt-4">
                  <p className="text-slate-600 text-sm whitespace-pre-line">
                    {section.footer}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
