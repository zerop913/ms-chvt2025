import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { apiCategoriesData } from "@/data/docs/apiCategories";
import { List } from "lucide-react";

export const metadata: Metadata = {
  title: "API Категорий | ЧВТ 2025",
  description: "Подробная документация по работе с API категорий товаров",
};

export default function ApiCategoriesPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={List}
        title={apiCategoriesData.title}
        description={apiCategoriesData.description}
      />

      {apiCategoriesData.sections.map((section, index) => (
        <DynamicSection key={index} {...section} />
      ))}
    </DocsLayout>
  );
}
