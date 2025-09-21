import type { Metadata } from "next";
import { DocsSidebar } from "@/components/docs";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Документация | ЧВТ 2025 - Мастер-класс по HTTP-сервисам в 1С",
  description:
    "Полная документация по созданию HTTP-сервисов в 1С: от создания базы данных до настройки голосового поиска.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Боковая панель навигации */}
        <aside className="fixed left-0 top-0 h-screen w-80 bg-white border-r border-gray-200 overflow-y-auto z-10">
          <DocsSidebar />
        </aside>

        {/* Основной контент */}
        <main className="ml-80 flex-1">
          <div className="mx-auto px-8 py-12">{children}</div>
        </main>
      </div>

      {/* Футер */}
      <div className="ml-80">
        <Footer />
      </div>
    </div>
  );
}
