export const apiPageData = {
  title: "API документация",
  description:
    "Описание REST API для работы с товарным каталогом через HTTP-сервисы 1С",
  steps: [
    {
      title: "Обзор API",
      description: "Основная информация о RESTful API товарного каталога",
      sections: [
        {
          type: "text" as const,
          icon: "Globe",
          title: "Базовые принципы",
          description: undefined,
          data: {
            content:
              "API построен по принципам REST архитектуры и возвращает данные в формате JSON. Все методы используют HTTP протокол и стандартные коды ответов.",
          },
        },
        {
          type: "parameterGrid" as const,
          icon: "Server",
          title: "Базовая информация",
          description: undefined,
          data: {
            parameters: [
              { label: "Базовый URL", value: "http://your-server/api" },
              { label: "Формат данных", value: "JSON" },
              { label: "Кодировка", value: "UTF-8" },
              { label: "Аутентификация", value: "Не требуется" },
            ],
          },
        },
      ],
    },
    {
      title: "Доступные эндпоинты",
      description: "Полный список методов API для работы с данными",
      sections: [
        {
          type: "text" as const,
          icon: "List",
          title: "Категории товаров",
          description: undefined,
          data: {
            content:
              "Методы для получения информации о категориях товаров и навигации по каталогу.",
          },
        },
        {
          type: "parameterGrid" as const,
          icon: "Tag",
          title: "API категорий",
          description: undefined,
          data: {
            parameters: [
              { label: "GET /categories", value: "Получить все категории" },
              {
                label: "GET /category/{id}",
                value: "Получить категорию по ID",
              },
              {
                label: "GET /category/{id}/products",
                value: "Товары категории",
              },
            ],
          },
        },
        {
          type: "text" as const,
          icon: "Package",
          title: "Товары",
          description: undefined,
          data: {
            content:
              "Методы для получения информации о товарах, включая цены, характеристики и связанные данные.",
          },
        },
        {
          type: "parameterGrid" as const,
          icon: "Package",
          title: "API товаров",
          description: undefined,
          data: {
            parameters: [
              { label: "GET /products", value: "Получить все товары" },
              { label: "GET /product/{id}", value: "Получить товар по ID" },
            ],
          },
        },
      ],
    },
    {
      title: "Примеры ответов",
      description: "Структура данных, возвращаемых API",
      sections: [
        {
          type: "codeBlock" as const,
          icon: "Code",
          title: "Ответ GET /categories",
          description: "Пример JSON ответа при получении списка категорий:",
          data: {
            code: `[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "code": "001",
    "name": "Электроника"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "code": "002", 
    "name": "Бытовая техника"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "code": "003",
    "name": "Компьютеры"
  }
]`,
          },
        },
        {
          type: "codeBlock" as const,
          icon: "Package",
          title: "Ответ GET /products",
          description: "Пример JSON ответа при получении списка товаров:",
          data: {
            code: `[
  {
    "id": "650e8400-e29b-41d4-a716-446655440000",
    "code": "TOV001",
    "name": "Смартфон Samsung Galaxy S23",
    "article": "SM-S911B",
    "price": 89990.00,
    "unit": "шт",
    "active": true,
    "category": {
      "code": "001",
      "name": "Электроника"
    }
  },
  {
    "id": "650e8400-e29b-41d4-a716-446655440001", 
    "code": "TOV002",
    "name": "Ноутбук Apple MacBook Air",
    "article": "MBA-M2-13",
    "price": 129990.00,
    "unit": "шт",
    "active": true,
    "category": {
      "code": "003",
      "name": "Компьютеры"
    }
  }
]`,
          },
        },
      ],
    },
  ],
  navigation: {
    prev: { href: "/docs/http-services", title: "HTTP-сервисы" },
    next: { href: "/docs/api/categories", title: "API категорий" },
  },
  highlight: {
    title: "API готов к использованию!",
    description:
      "REST API настроен и готов для интеграции с веб-приложениями. Теперь можно создавать фронтенд с голосовым поиском.",
    tags: ["REST API", "JSON", "HTTP"],
  },
};
