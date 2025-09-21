import type { Metadata } from "next";
import { Globe } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { apachePublishingPageData } from "@/data/docs/apachePublishing";

export const metadata: Metadata = {
  title: "Публикация HTTP-сервисов в 1С | Документация ЧВТ 2025",
  description: "Настройка публикации HTTP-сервисов 1С на веб-сервере Apache",
};

export default function PublishingPage() {
  const { title, description, steps, navigation, highlight } =
    apachePublishingPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={Globe} title={title} description={description} />

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
        icon={Globe}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
