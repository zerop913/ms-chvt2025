import { DocsPageData } from "@/types/docs";

export const apacheInstallationPageData: DocsPageData = {
  title: "Установка Apache HTTP Server",
  description:
    "Установка и настройка веб-сервера Apache для публикации HTTP-сервисов 1С согласно мастер-классу",
  steps: [
    {
      title: "Загрузка Apache",
      description:
        "Скачиваем Apache с официального сайта согласно мастер-классу",
      sections: [
        {
          type: "text" as const,
          icon: "AlertTriangle",
          title: "Важные требования",
          description:
            "Все действия выполняются от имени администратора. Убедитесь что порт 80 свободен и IIS отключен если установлен.",
        },
        {
          type: "stepList" as const,
          icon: "Globe",
          title: "Переход на сайт Apache Lounge",
          description:
            "Загружаем Apache с официального сайта согласно мастер-классу",
          data: [
            "Откройте браузер и перейдите по ссылке: https://www.apachelounge.com/download/",
            "Найдите раздел с последней версией Apache",
            "Выберите версию для своей системы 1С (чаще всего нужна win32)",
            "Скачайте файл .zip последней версии",
            "Сохраните файл в удобную папку",
          ],
        },
      ],
    },
    {
      title: "Распаковка и установка",
      description: "Распаковываем Apache в корень диска C",
      sections: [
        {
          type: "stepList" as const,
          icon: "FolderOpen",
          title: "Распаковка архива",
          description: "Извлекаем файлы Apache в корень диска C:",
          data: [
            "Найдите скачанный архив Apache",
            'Щелкните правой кнопкой мыши → "Извлечь всё..."',
            "Укажите путь C:\\ (корень диска C)",
            'Нажмите "Извлечь"',
            "В результате должна появиться папка C:\\Apache24",
          ],
        },
        {
          type: "text" as const,
          icon: "CheckCircle",
          title: "Проверка структуры",
          description:
            "После распаковки в папке C:\\Apache24 должны быть подпапки: bin, conf, htdocs, logs, modules",
        },
      ],
    },
    {
      title: "Настройка конфигурации согласно мастер-классу",
      description: "Настраиваем httpd.conf как указано в мастер-классе",
      sections: [
        {
          type: "stepList" as const,
          icon: "FileText",
          title: "Открытие файла конфигурации",
          description: "Открываем httpd.conf для редактирования",
          data: [
            "Откройте папку C:\\Apache24\\conf",
            "Найдите файл httpd.conf",
            "Откройте его через любой текстовый редактор",
            "Найдите строчку ServerName",
          ],
        },
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Настройка ServerName",
          description: "Настраиваем ServerName согласно мастер-классу",
          data: [
            'Найдите строку с "ServerName" (может быть закомментирована)',
            "Уберите символ # перед строкой если есть",
            "Замените example на localhost:80",
            "Должно получиться: ServerName localhost:80",
            "Сохраните файл",
          ],
        },
      ],
    },
    {
      title: "Настройка переменных среды",
      description: "Добавляем Apache в переменные среды Windows",
      sections: [
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Переход к переменным среды",
          description: "Открываем настройки переменных среды",
          data: [
            'В поиске Windows введите "Переменные среды"',
            'Откройте предложенный вариант "Изменение переменных среды"',
            'В открывшемся окне найдите переменную "Path"',
            'Нажмите "Изменить"',
          ],
        },
        {
          type: "stepList" as const,
          icon: "Plus",
          title: "Добавление пути к Apache",
          description: "Добавляем путь к исполняемым файлам Apache",
          data: [
            'Нажмите "Создать"',
            "Введите путь: C:\\Apache24\\bin",
            'Нажмите "ОК" для сохранения',
            "Закройте все окна переменных среды",
          ],
        },
      ],
    },
    {
      title: "Установка компонентов Visual C++",
      description:
        "Устанавливаем необходимые библиотеки согласно мастер-классу",
      sections: [
        {
          type: "stepList" as const,
          icon: "Download",
          title: "Загрузка Visual C++ Redistributable",
          description: "Скачиваем компоненты C++ с официального сайта",
          data: [
            "Перейдите по ссылке: https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170",
            "Скачайте Visual C++ Redistributable для вашей системы",
            "Запустите установщик от имени администратора",
            "Следуйте инструкциям установщика",
          ],
        },
      ],
    },
    {
      title: "Установка службы Apache",
      description: "Регистрируем Apache как службу Windows",
      sections: [
        {
          type: "stepList" as const,
          icon: "Terminal",
          title: "Запуск командной строки",
          description: "Открываем командную строку от администратора",
          data: [
            "Нажмите Win+R",
            'Введите "cmd"',
            "Нажмите Ctrl+Shift+Enter для запуска от администратора",
            "Подтвердите запуск в UAC",
          ],
        },
        {
          type: "stepList" as const,
          icon: "Code",
          title: "Установка службы",
          description: "Выполняем команды для установки службы",
          data: [
            "Введите команду: cd C:/Apache24/bin",
            "Нажмите Enter для перехода в папку",
            "Введите команду: httpd.exe -k install",
            "Дождитесь сообщения об успешной установке",
          ],
        },
      ],
    },
    {
      title: "Запуск службы Apache",
      description: "Запускаем службу и проверяем работу",
      sections: [
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Запуск через службы Windows",
          description: "Запускаем Apache через панель служб",
          data: [
            'В поиске Windows введите "Службы"',
            'Откройте найденное приложение "Службы"',
            'Найдите службу "Apache2.4"',
            'Щелкните правой кнопкой и выберите "Запустить"',
          ],
        },
        {
          type: "stepList" as const,
          icon: "Globe",
          title: "Проверка работы Apache",
          description: "Проверяем что Apache запустился успешно",
          data: [
            "Откройте браузер",
            "Перейдите по адресу: http://localhost:80/",
            'Вы должны увидеть страницу с надписью "It works!"',
            "Если страница отображается - Apache работает корректно",
          ],
        },
      ],
    },
  ],
  navigation: {
    prev: {
      href: "/docs/http-services",
      title: "HTTP-сервисы",
    },
    next: {
      href: "/docs/apache-setup/publishing",
      title: "Публикация на веб-сервере",
    },
  },
  highlight: {
    title: "Apache установлен!",
    description:
      "Apache HTTP Server установлен и настроен согласно мастер-классу. ServerName настроен на localhost:80, переменные среды добавлены, служба запущена. Можно переходить к публикации 1С.",
    tags: ["Apache", "Веб-сервер", "Установка", "Windows", "Службы"],
  },
};
