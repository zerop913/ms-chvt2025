import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { requirementsPageData } from "@/data/docs/requirements";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Требования к системе | Документация ЧВТ 2025",
  description:
    "Системные требования для прохождения мастер-класса по созданию HTTP-сервисов в 1С",
};

export default function RequirementsPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Settings}
        title={requirementsPageData.title}
        description={requirementsPageData.description}
      />

      {requirementsPageData.steps.map((step, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            {step.title}
          </h2>
          <p className="text-gray-600 ml-11 mb-6">{step.description}</p>

          {step.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="ml-11 mb-6">
              <DynamicSection {...section} />
            </div>
          ))}
        </div>
      ))}
    </DocsLayout>
  );
}
