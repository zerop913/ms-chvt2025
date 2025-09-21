export const apiCategoriesData = {
  title: "API Категорий",
  description:
    "Подробная документация по работе с категориями товаров через HTTP API",

  sections: [
    {
      type: "codeBlock" as const,
      icon: "List" as const,
      title: "Получение списка категорий",
      description: "Базовый запрос для получения всех категорий",
      data: {
        content: `GET /chvt2025/hs/api/categories
Host: localhost
Authorization: Basic Auth
Content-Type: application/json`,
      },
    },
    {
      type: "codeBlock" as const,
      icon: "Database" as const,
      title: "Пример ответа",
      description: "Структура JSON ответа с категориями",
      data: {
        content: `[
  {
    "id": "51d513e0-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000004",
    "name": "Товары для реабилитации"
  },
  {
    "id": "51d513dd-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000001",
    "name": "Ортопедические стельки"
  },
  {
    "id": "51d513de-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000002",
    "name": "Компрессионный трикотаж"
  },
  {
    "id": "51d513df-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000003",
    "name": "Корсеты и бандажи"
  }
]`,
      },
    },
    {
      type: "codeBlock" as const,
      icon: "Terminal" as const,
      title: "Пример cURL запроса",
      description: "Готовый к использованию cURL запрос",
      data: {
        content: `curl -X GET "http://localhost/chvt2025/hs/api/categories" \\
     -H "Authorization: Basic Auth" \\
     -H "Content-Type: application/json"`,
      },
    },
    {
      type: "parameterGrid" as const,
      icon: "Settings" as const,
      title: "Параметры ответа",
      description: "Описание полей в ответе API",
      data: {
        parameters: [
          { label: "id", value: "Уникальный идентификатор категории" },
          { label: "code", value: "Внутренний код категории в 1С" },
          { label: "name", value: "Наименование категории" },
        ],
      },
    },
  ],
};
