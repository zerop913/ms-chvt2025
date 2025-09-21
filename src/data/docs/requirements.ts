export const requirementsPageData = {
  title: "Требования к системе",
  description:
    "Системные требования для прохождения мастер-класса по созданию HTTP-сервисов в 1С",
  steps: [
    {
      title: "1С:Предприятие 8.3",
      description: "Основная платформа для разработки",
      sections: [
        {
          type: "parameterGrid" as const,
          icon: "Building2",
          title: "Системные требования",
          description: undefined,
          data: {
            parameters: [
              { label: "Версия платформы", value: "8.3.20 или новее" },
              { label: "Режим совместимости", value: "8.3.10 и выше" },
              {
                label: "Операционная система",
                value: "Windows 10/11, Windows Server 2016+",
              },
              {
                label: "Оперативная память",
                value: "4 ГБ (рекомендуется 8 ГБ)",
              },
              { label: "Свободное место", value: "2 ГБ на диске" },
            ],
          },
        },
        {
          type: "stepList" as const,
          icon: "CheckCircle",
          title: "Компоненты 1С",
          description: "Необходимые модули платформы:",
          data: {
            steps: [
              { text: "Конфигуратор - для разработки структуры данных" },
              { text: "Сервер 1С:Предприятие - для публикации HTTP-сервисов" },
              { text: "Веб-сервер расширение - для интеграции с Apache/IIS" },
            ],
          },
        },
      ],
    },
    {
      title: "Веб-сервер Apache",
      description: "Для публикации API и статических файлов",
      sections: [
        {
          type: "parameterGrid" as const,
          icon: "Globe",
          title: "Требования Apache",
          description: undefined,
          data: {
            parameters: [
              { label: "Версия Apache", value: "2.4.x" },
              { label: "Модули", value: "mod_rewrite, mod_proxy, mod_ssl" },
              { label: "Поддержка PHP", value: "Опционально (для админки)" },
              { label: "HTTPS", value: "Рекомендуется для production" },
            ],
          },
        },
      ],
    },
    {
      title: "Node.js окружение",
      description: "Для разработки веб-интерфейса",
      sections: [
        {
          type: "parameterGrid" as const,
          icon: "Terminal",
          title: "Node.js требования",
          description: undefined,
          data: {
            parameters: [
              { label: "Версия Node.js", value: "18.x или 20.x LTS" },
              { label: "Пакетный менеджер", value: "npm 9+ или yarn 1.22+" },
              {
                label: "Поддержка ES6+",
                value: "Встроенная в современный Node.js",
              },
            ],
          },
        },
        {
          type: "stepList" as const,
          icon: "Rocket",
          title: "npm пакеты",
          description: "Основные зависимости для фронтенда:",
          data: {
            steps: [
              { text: "Express.js - веб-фреймворк для сервера" },
              { text: "Socket.io - для WebSocket соединений" },
              { text: "Web Speech API - встроенный в браузеры" },
              { text: "Современный бандлер (Webpack/Vite)" },
            ],
          },
        },
      ],
    },
    {
      title: "Дополнительные инструменты",
      description: "Полезные программы для разработки",
      sections: [
        {
          type: "parameterGrid" as const,
          icon: "Monitor",
          title: "Рекомендуемые инструменты",
          description: undefined,
          data: {
            parameters: [
              { label: "IDE", value: "Visual Studio Code, IntelliJ IDEA" },
              { label: "REST клиент", value: "Postman, Insomnia, curl" },
              {
                label: "Браузер",
                value: "Chrome/Firefox (для Web Speech API)",
              },
              { label: "Git", value: "Для версионирования кода" },
            ],
          },
        },
      ],
    },
  ],
  navigation: {
    prev: { href: "/docs/introduction", title: "Введение" },
    next: { href: "/docs/database-setup", title: "Создание базы данных" },
  },
  highlight: {
    title: "Готовность к работе",
    description:
      "Убедитесь, что все компоненты установлены и настроены перед началом мастер-класса.",
    tags: ["1С 8.3.20+", "Apache 2.4", "Node.js 18+"],
  },
};
