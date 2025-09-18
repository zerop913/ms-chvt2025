import { HeroContent, FloatingElement } from "../types/hero";

export const heroContent: HeroContent = {
  title: {
    main: "ГОЛОСОВОЙ",
    highlight: "АССИСТЕНТ",
    suffix: "ДЛЯ МЕДИЦИНЫ",
  },
  subtitle: "РАЗРАБОТКА ГОЛОСОВОГО ИНТЕРФЕЙСА ДЛЯ МЕДИЦИНСКИХ СИСТЕМ",
  description: [],
  competency: {
    label: "МАСТЕР КЛАСС",
    event: "ЦИФРОВОЙ ДВОЙНИК ПАЦИЕНТА",
    year: "ЧВТ 2025",
  },
};

export const floatingElements: FloatingElement[] = [
  {
    id: "pulse-1",
    size: "lg",
    position: { top: "20%", left: "15%" },
    animation: { duration: "4s", delay: "0s" },
    shape: "circle",
  },
  {
    id: "pulse-2",
    size: "md",
    position: { top: "60%", left: "85%" },
    animation: { duration: "5s", delay: "1s" },
    shape: "circle",
  },
  {
    id: "geometric-1",
    size: "sm",
    position: { top: "30%", left: "90%" },
    animation: { duration: "8s", delay: "2s" },
    shape: "triangle",
  },
  {
    id: "geometric-2",
    size: "md",
    position: { top: "70%", left: "10%" },
    animation: { duration: "6s", delay: "1.5s" },
    shape: "hexagon",
  },
];
