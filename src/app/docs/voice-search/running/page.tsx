import type { Metadata } from "next";
import { Play } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { voiceSearchRunningPageData } from "@/data/docs/voiceSearchRunning";

export const metadata: Metadata = {
  title: "Запуск приложения голосового поиска | Документация ЧВТ 2025",
  description:
    "Финальный этап: запуск Next.js приложения и тестирование голосового поиска",
};

export default function RunningPage() {
  const { title, description, steps, navigation, highlight } =
    voiceSearchRunningPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={Play} title={title} description={description} />

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
        icon={Play}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
