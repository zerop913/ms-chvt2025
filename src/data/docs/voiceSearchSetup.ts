import { DocsPageData } from "@/types/docs";

export const voiceSearchSetupPageData: DocsPageData = {
  title: "Настройка голосового поиска",
  description:
    "Установка Node.js, настройка PowerShell и скачивание проекта голосового поиска согласно мастер-классу",
  steps: [
    {
      title: "Установка Node.js",
      description: "Устанавливаем Node.js для работы с проектом",
      sections: [
        {
          type: "stepList" as const,
          icon: "Download",
          title: "Скачивание Node.js",
          description: "Загружаем Node.js с официального сайта",
          data: [
            "Перейдите по ссылке: https://nodejs.org/en/download",
            "Скачайте LTS версию для Windows",
            "Запустите загруженный установщик",
            "Следуйте инструкциям установщика (оставьте все настройки по умолчанию)",
            "Дождитесь завершения установки",
          ],
        },
        {
          type: "stepList" as const,
          icon: "CheckCircle",
          title: "Проверка установки Node.js",
          description: "Убеждаемся, что Node.js установлен корректно",
          data: [
            "Откройте командную строку (Win+R, введите cmd)",
            "Выполните команду: node -v",
            "Вы должны увидеть версию Node.js (например, v18.17.0)",
            "Если команда не найдена, перезагрузите компьютер и попробуйте снова",
          ],
        },
      ],
    },
    {
      title: "Настройка PowerShell",
      description:
        "Настраиваем PowerShell для работы с проектом согласно мастер-классу",
      sections: [
        {
          type: "stepList" as const,
          icon: "Terminal",
          title: "Изменение политики выполнения",
          description: "Настраиваем PowerShell для запуска скриптов",
          data: [
            "Запустите PowerShell от имени администратора",
            "Щелкните правой кнопкой по кнопке Пуск → Windows PowerShell (администратор)",
            "Выполните команду: Set-ExecutionPolicy RemoteSigned",
            "На вопрос ответьте: A (Да для всех)",
            "Дождитесь применения изменений",
          ],
        },
        {
          type: "text" as const,
          icon: "Info",
          title: "Зачем это нужно",
          description:
            "Изменение политики выполнения необходимо для корректной работы npm скриптов и других инструментов разработки в PowerShell.",
        },
      ],
    },
    {
      title: "Скачивание проекта с GitHub",
      description: "Получаем исходный код приложения голосового поиска",
      sections: [
        {
          type: "stepList" as const,
          icon: "Download",
          title: "Загрузка проекта",
          description: "Скачиваем проект с GitHub согласно мастер-классу",
          data: [
            "Перейдите на сайт: https://github.com/zerop913/search-api-chvt",
            'Нажмите на большую зеленую кнопку "Code"',
            'В выпадающем меню выберите "Download ZIP"',
            "Сохраните архив в удобное место",
          ],
        },
        {
          type: "stepList" as const,
          icon: "FolderOpen",
          title: "Распаковка и подготовка",
          description: "Извлекаем файлы и подготавливаем проект",
          data: [
            "После скачивания распакуйте архив",
            "Откройте папку в любом удобном редакторе кода",
            "Рекомендуется VS Code, Sublime Text или другой",
            "Убедитесь, что в корне проекта есть файл package.json",
          ],
        },
      ],
    },
    {
      title: "Установка зависимостей проекта",
      description: "Устанавливаем необходимые библиотеки",
      sections: [
        {
          type: "stepList" as const,
          icon: "Terminal",
          title: "Установка через npm",
          description: "Выполняем установку в командной строке проекта",
          data: [
            "Откройте терминал в папке проекта",
            "Альтернативно: откройте командную строку и перейдите в папку проекта",
            "Выполните команду: npm install",
            "Дождитесь завершения установки (может занять несколько минут)",
          ],
        },
        {
          type: "text" as const,
          icon: "Package",
          title: "Что устанавливается",
          description:
            "npm install загрузит все необходимые зависимости для работы Next.js приложения, включая библиотеки для голосового API и пользовательского интерфейса.",
        },
      ],
    },
  ],
  navigation: {
    prev: {
      href: "/docs/apache-setup/publishing",
      title: "Публикация на Apache",
    },
    next: {
      href: "/docs/voice-search/nodejs",
      title: "Настройка API",
    },
  },
  highlight: {
    title: "Подготовка завершена!",
    description:
      "Node.js установлен, PowerShell настроен, проект скачан и зависимости установлены. Можно переходить к настройке API подключения.",
    tags: ["Node.js", "PowerShell", "GitHub", "npm"],
  },
};
