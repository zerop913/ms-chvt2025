import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { databaseSetupData } from "@/data/docs/databaseSetup";
import { Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Создание базы 1С | Документация ЧВТ 2025",
  description:
    "Пошаговое руководство по созданию новой информационной базы 1С:Предприятие 8.3",
};

export default function DatabaseSetupPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Database}
        title={databaseSetupData.title}
        description={databaseSetupData.description}
      />

      {databaseSetupData.sections.map((section, index) => (
        <DynamicSection key={index} {...section} />
      ))}
    </DocsLayout>
  );
}
