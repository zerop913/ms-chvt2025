import { DocsLayout } from "@/components/docs/DocsLayout";
import { DocsPageHeader } from "@/components/docs/DocsPageHeader";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { apiExamplesData } from "@/data/docs/apiExamples";
import { Code } from "lucide-react";

export default function ApiExamplesPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Code}
        title={apiExamplesData.title}
        description={apiExamplesData.description}
      />

      <div className="space-y-8">
        {apiExamplesData.sections.map((section, index) => (
          <DynamicSection
            key={index}
            type={section.type}
            icon={section.icon}
            title={section.title}
            description={section.description}
            data={section.data}
          />
        ))}
      </div>
    </DocsLayout>
  );
}
