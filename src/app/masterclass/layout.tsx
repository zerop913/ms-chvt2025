import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мастер-класс | ЧВТ 2025 - HTTP-сервисы в 1С",
  description:
    "Интерактивный мастер-класс по созданию HTTP-сервисов в 1С. Пошаговое изучение разработки RESTful API и интеграции с внешними системами.",
};

export default function MasterclassLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
