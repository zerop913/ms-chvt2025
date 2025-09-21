import type { Metadata } from "next";
import { DocsLayout, DocsPageHeader, DynamicSection } from "@/components/docs";
import { apiProductsData } from "@/data/docs/apiProducts";
import { Package } from "lucide-react";

export const metadata: Metadata = {
  title: "API Товаров | ЧВТ 2025",
  description:
    "Подробная документация по работе с API товаров через HTTP сервисы",
};

export default function ApiProductsPage() {
  return (
    <DocsLayout>
      <DocsPageHeader
        icon={Package}
        title={apiProductsData.title}
        description={apiProductsData.description}
      />

      {apiProductsData.sections.map((section, index) => (
        <DynamicSection key={index} {...section} />
      ))}
    </DocsLayout>
  );
}
