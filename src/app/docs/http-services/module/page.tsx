import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { httpServicesModuleData } from "@/data/docs/httpServicesModule";
import { Code } from "lucide-react";

export const metadata: Metadata = {
  title: "Создание модуля HTTP-сервиса | ЧВТ 2025",
  description: "Пошаговое создание модуля HTTP-сервиса в конфигураторе 1С",
};

export default function HttpServiceModulePage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Code}
        title={httpServicesModuleData.title}
        description={httpServicesModuleData.description}
      />

      {httpServicesModuleData.sections.map((section, index) => (
        <DynamicSection key={index} {...section} />
      ))}
    </DocsLayout>
  );
}
