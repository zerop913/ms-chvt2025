import { DocsPageData } from "@/types/docs";

export const apacheConfigurationPageData: DocsPageData = {
  title: "Настройка Apache согласно мастер-классу",
  description:
    "Настройка файла httpd.conf, переменных среды и установка Apache как службы Windows",
  steps: [
    {
      title: "Настройка конфигурационного файла httpd.conf",
      description: "Редактируем основной файл конфигурации Apache",
      sections: [
        {
          type: "stepList" as const,
          icon: "FileText",
          title: "Открытие файла конфигурации",
          description: "Найдем и откроем файл httpd.conf для редактирования",
          data: [
            "Перейдите в папку C:\\Apache24\\conf",
            "Найдите файл httpd.conf",
            'Щелкните правой кнопкой → "Открыть с помощью" → "Блокнот"',
            "Или используйте любой текстовый редактор",
          ],
        },
        {
          type: "stepList" as const,
          icon: "Search",
          title: "Настройка ServerName согласно мастер-классу",
          description: "Находим и изменяем строку ServerName",
          data: [
            'Нажмите Ctrl+F и найдите строку "ServerName"',
            'Вы найдете строку вида: "#ServerName www.example.com:80"',
            "Уберите символ # в начале строки",
            'Замените "www.example.com" на "localhost:80"',
            'Должно получиться: "ServerName localhost:80"',
            "Сохраните файл (Ctrl+S)",
          ],
        },
      ],
    },
    {
      title: "Настройка переменных среды Windows",
      description: "Добавляем путь к Apache в системную переменную PATH",
      sections: [
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Открытие настроек переменных среды",
          description: "Переходим к настройке переменных среды системы",
          data: [
            'В поиске Windows введите "Переменные среды"',
            'Выберите "Изменение переменных среды системы"',
            'В открывшемся окне нажмите кнопку "Переменные среды..."',
            'Найдите переменную "Path" в разделе "Системные переменные"',
            'Выберите "Path" и нажмите "Изменить..."',
          ],
        },
        {
          type: "stepList" as const,
          icon: "Plus",
          title: "Добавление пути к Apache",
          description: "Добавляем папку с исполняемыми файлами Apache",
          data: [
            'Нажмите кнопку "Создать"',
            "Введите путь: C:\\Apache24\\bin",
            'Нажмите "ОК" для сохранения',
            'Нажмите "ОК" во всех открытых окнах',
          ],
        },
      ],
    },
    {
      title: "Установка Microsoft Visual C++ Redistributable",
      description: "Устанавливаем компоненты, необходимые для работы Apache",
      sections: [
        {
          type: "stepList" as const,
          icon: "Download",
          title: "Скачивание Visual C++ Redistributable",
          description: "Загружаем компоненты с официального сайта Microsoft",
          data: [
            "Перейдите по ссылке: https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170",
            "Скачайте версию для вашей архитектуры (x64 или x86)",
            "Обычно нужна версия x64",
            "Запустите загруженный файл",
            "Следуйте инструкциям установщика",
          ],
        },
        {
          type: "text" as const,
          icon: "Info",
          title: "Необходимость компонентов",
          description:
            "Visual C++ Redistributable необходимы для корректной работы Apache на Windows. Без них Apache может не запускаться или работать нестабильно.",
        },
      ],
    },
    {
      title: "Установка Apache как службы Windows",
      description:
        "Устанавливаем Apache как службу для автоматического запуска",
      sections: [
        {
          type: "stepList" as const,
          icon: "Terminal",
          title: "Открытие командной строки от администратора",
          description: "Запускаем командную строку с правами администратора",
          data: [
            "Нажмите клавиши Win+R",
            "Введите cmd",
            "Нажмите Ctrl+Shift+Enter (запуск от имени администратора)",
            "Подтвердите запрос UAC",
          ],
        },
        {
          type: "stepList" as const,
          icon: "FolderOpen",
          title: "Переход в каталог Apache и установка службы",
          description: "Выполняем команды для установки службы",
          data: [
            "Выполните команду: cd C:/Apache24/bin",
            "Затем выполните: httpd.exe -k install",
            "Дождитесь сообщения об успешной установке",
          ],
        },
      ],
    },
    {
      title: "Запуск службы Apache",
      description: "Запускаем установленную службу Apache",
      sections: [
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Через диспетчер служб Windows",
          description: "Управляем службой через графический интерфейс",
          data: [
            'В поиске Windows введите "Службы" и откройте приложение',
            'Найдите в списке службу "Apache2.4"',
            "Щелкните правой кнопкой мыши по службе Apache2.4",
            'Выберите "Запустить"',
            'Дождитесь изменения статуса на "Работает"',
          ],
        },
        {
          type: "stepList" as const,
          icon: "CheckCircle",
          title: "Проверка работы Apache",
          description: "Тестируем работу веб-сервера",
          data: [
            "Откройте любой браузер",
            "Перейдите по адресу: http://localhost:80/",
            'Вы должны увидеть страницу с надписью "It works!"',
            "Если страница открылась, Apache работает корректно",
          ],
        },
      ],
    },
  ],
  navigation: {
    prev: {
      href: "/docs/apache-setup/installation",
      title: "Установка Apache",
    },
    next: {
      href: "/docs/apache-setup/publishing",
      title: "Публикация 1С",
    },
  },
  highlight: {
    title: "Apache настроен!",
    description:
      "Apache HTTP Server настроен согласно мастер-классу с ServerName localhost:80, переменными среды и работает как служба Windows. Готов к публикации 1С.",
    tags: ["Apache", "Конфигурация", "Windows", "Служба"],
  },
};
