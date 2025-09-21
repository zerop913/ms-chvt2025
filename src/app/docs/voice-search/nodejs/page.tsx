import type { Metadata } from "next";
import { Zap } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { voiceSearchNodejsPageData } from "@/data/docs/voiceSearchNodejs";

export const metadata: Metadata = {
  title: "Установка Node.js | Документация ЧВТ 2025",
  description:
    "Установка Node.js и настройка PowerShell для запуска голосового поиска",
};

export default function NodejsPage() {
  const { title, description, steps, navigation, highlight } =
    voiceSearchNodejsPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={Zap} title={title} description={description} />

      <div className="space-y-16">
        {steps.map((step, stepIndex) => (
          <DocsStep
            key={stepIndex}
            stepNumber={stepIndex + 1}
            title={step.title}
            description={step.description}
          >
            {step.sections.map((section, sectionIndex) => (
              <DynamicSection
                key={sectionIndex}
                type={section.type}
                icon={section.icon}
                title={section.title}
                description={section.description}
                data={section.data}
              />
            ))}
          </DocsStep>
        ))}
      </div>

      <DocsHighlightBox
        icon={Zap}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
