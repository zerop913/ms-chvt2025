import type { Metadata } from "next";
import { Hero, MasterClassSection } from "../components/home";
import { Footer } from "../components/layout";

export const metadata: Metadata = {
  title: "Главная | ЧВТ 2025 - Voice Assistant",
  description:
    "Мастер-класс по разработке HTTP-сервисов в 1С. Изучите создание RESTful API и интеграцию с внешними системами.",
};

export default function Home() {
  return (
    <div>
      <Hero />
      <MasterClassSection />
      <Footer />
    </div>
  );
}
