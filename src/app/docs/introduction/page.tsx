import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { introductionPageData } from "@/data/docs/introduction";

export const metadata: Metadata = {
  title: "Введение | Документация ЧВТ 2025",
  description:
    "Введение в мастер-класс по созданию HTTP-сервисов в 1С с голосовым поиском",
};

export default function IntroductionPage() {
  const { title, description, steps, navigation, highlight } =
    introductionPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={BookOpen} title={title} description={description} />

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
        icon={BookOpen}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
