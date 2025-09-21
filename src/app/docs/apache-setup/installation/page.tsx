import type { Metadata } from "next";
import { Download } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { apacheInstallationPageData } from "@/data/docs/apacheInstallation";

export const metadata: Metadata = {
  title: "Установка Apache | Документация ЧВТ 2025",
  description:
    "Пошаговая установка и настройка веб-сервера Apache для публикации 1С HTTP-сервисов",
};

export default function ApacheInstallationPage() {
  const { title, description, steps, navigation, highlight } =
    apacheInstallationPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={Download} title={title} description={description} />

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
        icon={Download}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
