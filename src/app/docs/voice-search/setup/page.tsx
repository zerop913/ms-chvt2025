import type { Metadata } from "next";
import { Settings } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { voiceSearchSetupPageData } from "@/data/docs/voiceSearchSetup";

export const metadata: Metadata = {
  title: "Настройка проекта голосового поиска | Документация ЧВТ 2025",
  description:
    "Скачивание и настройка Next.js приложения с голосовым поиском для интеграции с 1С API",
};

export default function VoiceSearchSetupPage() {
  const { title, description, steps, navigation, highlight } =
    voiceSearchSetupPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={Settings} title={title} description={description} />

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
        icon={Settings}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
