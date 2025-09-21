import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { configuratorData } from "@/data/docs/configuratorData";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Запуск конфигуратора | Документация ЧВТ 2025",
  description:
    "Как открыть информационную базу в режиме конфигуратора и начать разработку",
};

export default function ConfiguratorPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Settings}
        title={configuratorData.title}
        description={configuratorData.description}
      />

      {configuratorData.sections.map((section, index) => (
        <DynamicSection key={index} {...section} />
      ))}
    </DocsLayout>
  );
}
