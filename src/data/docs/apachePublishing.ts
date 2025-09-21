import { DocsPageData } from "@/types/docs";

export const apachePublishingPageData: DocsPageData = {
  title: "Публикация HTTP-сервисов на Apache",
  description:
    "Публикация созданных HTTP-сервисов на веб-сервере Apache согласно мастер-классу",
  steps: [
    {
      title: "Возврат в 1С от имени администратора",
      description: "Возвращаемся в 1С для настройки публикации",
      sections: [
        {
          type: "text" as const,
          icon: "Info",
          title: "Важно!",
          description:
            "Если вы закрыли 1С, то обязательно откройте её снова от имени администратора. Это необходимо для корректной работы с Apache.",
        },
        {
          type: "stepList" as const,
          icon: "Building",
          title: "Запуск 1С от администратора",
          description: "Если 1С была закрыта, запускаем её правильно",
          data: [
            "Щелкните правой кнопкой по ярлыку 1С",
            'Выберите "Запуск от имени администратора"',
            "Откройте вашу базу данных",
            "Перейдите в режим конфигуратора или предприятия",
          ],
        },
      ],
    },
    {
      title: "Переход к публикации на веб-сервере",
      description: "Открываем панель публикации согласно мастер-классу",
      sections: [
        {
          type: "stepList" as const,
          icon: "Settings",
          title: "Открытие панели публикации",
          description: "Переходим к настройке публикации HTTP-сервисов",
          data: [
            'В верхней панели нажмите "Администрирование"',
            'Выберите "Публикация на веб-сервере..."',
            "Откроется окно настройки публикации",
          ],
        },
      ],
    },
    {
      title: "Настройка параметров публикации",
      description: "Задаем параметры публикации согласно мастер-классу",
      sections: [
        {
          type: "stepList" as const,
          icon: "Server",
          title: "Основные настройки публикации",
          description: "Настраиваем параметры как указано в мастер-классе",
          data: [
            'Дать имя публикации: "chvt2025"',
            'Выбрать веб-сервер: "Apache 2.4"',
            'Указать каталог: "C:/Apache24/htdocs/" и создать нужную папку',
            'Должно получиться: "C:\\Apache24\\htdocs\\chvt2025\\"',
          ],
        },
        {
          type: "stepList" as const,
          icon: "Code",
          title: "Настройка HTTP-сервисов",
          description: "Настраиваем публикацию HTTP-сервисов",
          data: [
            'Перейдите на вкладку "HTTP-сервисы" в том же окне',
            'Поставьте галочку "Публиковать HTTP-сервисы по умолчанию"',
            "Найдите созданный модуль API и поставьте галочку напротив него",
            'Поставьте галочку "Публиковать HTTP-сервисы расширений по умолчанию"',
          ],
        },
        {
          type: "stepList" as const,
          icon: "Play",
          title: "Запуск публикации",
          description: "Применяем настройки и публикуем сервисы",
          data: [
            'Нажмите кнопку "Опубликовать"',
            "Дождитесь завершения процесса публикации",
            "При успешной публикации система предложит перезапустить Apache",
            'Согласитесь на перезапуск Apache (нажмите "Да")',
          ],
        },
      ],
    },
    {
      title: "Проверка работы API",
      description: "Тестируем доступность опубликованных HTTP-сервисов",
      sections: [
        {
          type: "stepList" as const,
          icon: "Globe",
          title: "Тестирование через браузер",
          description: "Проверяем работу API через веб-браузер",
          data: [
            "Откройте любой веб-браузер",
            "Перейдите по адресу: http://localhost:80/chvt2025/hs/api/categories/",
            "Система запросит авторизацию",
            'Введите логин: "admin"',
            'Введите пароль: "root"',
          ],
        },
        {
          type: "text" as const,
          icon: "CheckCircle",
          title: "Ожидаемый результат",
          description:
            "Если всё настроено правильно, вы должны увидеть JSON-ответ с категориями, которые вы создали в справочнике. Это означает, что API работает корректно.",
        },
        {
          type: "stepList" as const,
          icon: "Code",
          title: "Дополнительные проверки",
          description: "Проверим другие endpoints API",
          data: [
            "http://localhost:80/chvt2025/hs/api/categories/products - все товары",
            "http://localhost:80/chvt2025/hs/api/categories/{id} - конкретная категория",
            "http://localhost:80/chvt2025/hs/api/categories/{id}/products - товары категории",
            "Все должны возвращать данные в формате JSON",
          ],
        },
      ],
    },
    {
      title: "Готовность к голосовому поиску",
      description:
        "Подготовка к следующему этапу - настройке голосового ассистента",
      sections: [
        {
          type: "text" as const,
          icon: "CheckCircle",
          title: "Этап завершен успешно",
          description:
            "HTTP-сервисы 1С успешно опубликованы на Apache и доступны по адресу http://localhost:80/chvt2025/hs/api/. Теперь можно переходить к настройке голосового ассистента.",
        },
      ],
    },
  ],
  navigation: {
    prev: {
      href: "/docs/apache-setup/configuration",
      title: "Конфигурирование Apache",
    },
    next: {
      href: "/docs/voice-search/setup",
      title: "Настройка голосового поиска",
    },
  },
  highlight: {
    title: "HTTP-сервисы опубликованы!",
    description:
      "API 1С успешно опубликовано на Apache. Все endpoints доступны по адресу http://localhost:80/chvt2025/hs/api/ с базовой аутентификацией admin:root.",
    tags: ["Apache", "1С", "HTTP-сервисы", "API", "Публикация"],
  },
};
