import type { Metadata } from "next";
import { FolderPlus } from "lucide-react";
import {
  DocsLayout,
  DocsPageHeader,
  DocsStep,
  DocsHighlightBox,
  DocsNavigation,
} from "@/components/docs";
import { DynamicSection } from "@/components/docs/DynamicSection";
import { catalogsPageData } from "@/data/docs/catalogs";

export const metadata: Metadata = {
  title: "Создание справочников | Документация ЧВТ 2025",
  description:
    "Пошаговое создание справочников Категории и Товары в 1С конфигураторе",
};

export default function CatalogsPage() {
  const { title, description, steps, navigation, highlight } = catalogsPageData;

  return (
    <DocsLayout>
      <DocsPageHeader
        icon={FolderPlus}
        title={title}
        description={description}
      />

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
        icon={FolderPlus}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation prevPage={navigation.prev} nextPage={navigation.next} />
    </DocsLayout>
  );
}
