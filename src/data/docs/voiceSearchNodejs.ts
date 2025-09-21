import { DocsPageData } from "@/types/docs";

export const voiceSearchNodejsPageData: DocsPageData = {
  title: "Установка Node.js",
  description:
    "Скачивание и установка Node.js для работы с голосовым поиском согласно мастер-классу",
  steps: [
    {
      title: "Скачивание Node.js",
      description: "Получаем установочный файл с официального сайта",
      sections: [
        {
          type: "stepList" as const,
          icon: "Download",
          title: "Переход на официальный сайт",
          description:
            "Скачиваем Node.js с официального сайта согласно мастер-классу",
          data: [
            "Откройте браузер и перейдите по ссылке: https://nodejs.org/en/download",
            "Выберите версию для Windows (обычно LTS версия)",
            "Скачайте установочный файл .msi",
            "Сохраните файл в папку Загрузки",
          ],
        },
        {
          type: "text" as const,
          icon: "Info",
          title: "Рекомендуемая версия",
          description:
            "Рекомендуется скачивать LTS (Long Term Support) версию Node.js, так как она наиболее стабильная и подходит для продакшн-использования.",
        },
      ],
    },
    {
      title: "Установка Node.js",
      description: "Запускаем установщик и настраиваем Node.js",
      sections: [
        {
          type: "stepList" as const,
          icon: "Play",
          title: "Процесс установки",
          description: "Устанавливаем Node.js с настройками по умолчанию",
          data: [
            "Найдите скачанный файл node-vXX.XX.X-x64.msi",
            "Запустите установщик от имени администратора",
            "Следуйте инструкциям мастера установки",
            "Оставьте все настройки по умолчанию",
            "Дождитесь завершения установки",
          ],
        },
        {
          type: "text" as const,
          icon: "CheckCircle",
          title: "Что устанавливается",
          description:
            "Вместе с Node.js автоматически устанавливается npm (Node Package Manager), который потребуется для установки зависимостей проекта.",
        },
      ],
    },
    {
      title: "Проверка установки",
      description: "Убеждаемся, что Node.js установлен корректно",
      sections: [
        {
          type: "stepList" as const,
          icon: "Terminal",
          title: "Проверка в командной строке",
          description: "Проверяем версию Node.js согласно мастер-классу",
          data: [
            "Откройте командную строку (cmd) или PowerShell",
            "Выполните команду: node -v",
            "Вы должны увидеть версию Node.js (например: v18.17.0)",
            "Также проверьте npm командой: npm -v",
            "Если команды выполняются успешно - установка прошла корректно",
          ],
        },
        {
          type: "text" as const,
          icon: "AlertTriangle",
          title: "Если команды не работают",
          description:
            "Если команды node -v или npm -v не распознаются, перезагрузите компьютер или перезапустите командную строку. Node.js добавляет свой путь в переменные среды автоматически.",
        },
      ],
    },
  ],
  navigation: {
    prev: {
      href: "/docs/apache-setup/publishing",
      title: "Публикация в Apache",
    },
    next: {
      href: "/docs/voice-search/setup",
      title: "Настройка голосового поиска",
    },
  },
  highlight: {
    title: "Node.js установлен!",
    description:
      "Node.js успешно установлен и готов к использованию. Теперь можно переходить к настройке PowerShell и скачиванию проекта голосового поиска.",
    tags: ["Node.js", "npm", "Установка", "JavaScript"],
  },
};
