import { MasterClassContent } from "../types/masterclass-new";

export const masterClassContent: MasterClassContent = {
  title: "О МАСТЕР-КЛАССЕ",
  subtitle: "ТЕХНОЛОГИИ, КОТОРЫЕ ИЗМЕНЯТ МЕДИЦИНСКИЕ ПРОЦЕССЫ",
  description: [
    "Революционное решение на базе 1С для автоматизации медицинских процессов",
    "Интеграция голосового управления для упрощения документооборота",
    "Повышение эффективности работы медицинского персонала через умные технологии",
  ],
  technologies: {
    primary: "1С:ПРЕДПРИЯТИЕ 8",
    modules: [
      "HTTP-сервисы и API интеграция",
      "Модули голосового распознавания",
      "Система управления медицинскими данными",
      "Интерфейсы взаимодействия с внешними системами",
    ],
    benefits: [
      "Сокращение времени на документооборот до 70%",
      "Снижение количества ошибок при вводе данных",
      "Упрощение процессов для медицинского персонала",
      "Интеграция с существующими медицинскими системами",
    ],
  },
  experts: [
    {
      id: "varfolomeeva",
      name: "Варфоломеева Полина Вадимовна",
      role: "Эксперт",
      contacts: {
        telegram: "@xfhxf_2",
        email: "polinavarfolomeeva90@gmail.com",
        website: "https://portfolio-varfolomeeva.vercel.app/",
      },
    },
    {
      id: "smolin",
      name: "Смолин Иван Григорьевич",
      role: "Эксперт",
      contacts: {
        telegram: "@zerop913",
        email: "info@ivan-smolin.ru",
        website: "https://ivan-smolin.ru/",
      },
    },
    {
      id: "pavlov",
      name: "Павлов Ян Владимирович",
      role: "Эксперт",
      contacts: {
        telegram: "@Pure21Byte",
        email: "yanpavlov.04@mail.ru",
        website: "#",
      },
    },
    {
      id: "bogolyubov",
      name: "Боголюбов Антон Андреевич",
      role: "Эксперт",
      contacts: {
        telegram: "@ssaw13",
        email: "bogolyubovaw13@ya.ru",
        website: "#",
      },
    },
  ],
};
