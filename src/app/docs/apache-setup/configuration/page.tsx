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
import { apacheConfigurationPageData } from "@/data/docs/apacheConfiguration";

export const metadata: Metadata = {
  title: "Настройка Apache как службы | Документация ЧВТ 2025",
  description:
    "Установка Apache как службы Windows и первый запуск веб-сервера",
};

export default function ApacheConfigurationPage() {
  const { title, description, steps, navigation, highlight } =
    apacheConfigurationPageData;

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
