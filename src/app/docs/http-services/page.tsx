import type { Metadata } from "next";
import { Server } from 'lucide-react';
import { 
  DocsLayout, 
  DocsPageHeader, 
  DocsStep, 
  DocsHighlightBox, 
  DocsNavigation 
} from '@/components/docs';
import { DynamicSection } from '@/components/docs/DynamicSection';
import { httpServicesPageData } from '@/data/docs/httpServices';

export const metadata: Metadata = {
  title: "HTTP-сервисы | Документация ЧВТ 2025",
  description: "Создание и настройка HTTP-сервисов в 1С:Предприятие для API",
};

export default function HttpServicesPage() {
  const { title, description, steps, navigation, highlight } = httpServicesPageData;

  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Server}
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
        icon={Server}
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