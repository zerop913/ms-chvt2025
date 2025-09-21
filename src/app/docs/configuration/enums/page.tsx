import type { Metadata } from "next";
import { List } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { enumsPageData } from "@/data/docs/enums";

export const metadata: Metadata = {
  title: "Перечисления | ЧВТ 2025",
  description: "Создание перечислений в конфигурации 1С",
};

export default function ConfigurationEnumsPage() {
  const { title, description, steps, navigation, highlight } = enumsPageData;

  return (
    <DocsLayout>
      <DocsPageHeader icon={List} title={title} description={description} />

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
        icon={List}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
