import type { Metadata } from "next";
import { Globe } from 'lucide-react';
import { 
  DocsLayout, 
  DocsPageHeader, 
  DocsStep, 
  DocsHighlightBox, 
  DocsNavigation 
} from '@/components/docs';
import { DynamicSection } from '@/components/docs/DynamicSection';
import { apiPageData } from '@/data/docs/api';

export const metadata: Metadata = {
  title: "API документация | Документация ЧВТ 2025",
  description: "Описание REST API для работы с товарным каталогом через HTTP-сервисы 1С",
};

export default function ApiPage() {
  const { title, description, steps, navigation, highlight } = apiPageData;

  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Globe}
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
        icon={Globe}
        title={highlight.title}
        description={highlight.description}
        tags={highlight.tags}
      />

      <DocsNavigation
        prevPage={navigation.prev}
        nextPage={navigation.next}
      />
    </DocsLayout>
  );
}