export const apiProductsData = {
  title: "API Товаров",
  description: "Работа с товарами через HTTP API",

  sections: [
    {
      type: "codeBlock" as const,
      icon: "Package" as const,
      title: "Получение списка товаров",
      description: "Базовый запрос для получения товаров",
      data: {
        content: `GET /chvt2025/hs/api/categories/products
Host: localhost
Authorization: Basic Auth`,
      },
    },
    {
      type: "codeBlock" as const,
      icon: "Database" as const,
      title: "Пример ответа",
      description: "Структура JSON ответа с товарами",
      data: {
        content: `[
  {
    "id": "51d513ea-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000010",
    "name": "Мяч для кинезиотерапии",
    "article": "ART-REH-001",
    "price": 1200,
    "unit": "Штука",
    "active": true,
    "category": {
      "code": "000000004",
      "name": "Товары для реабилитации"
    }
  },
  {
    "id": "51d513e5-921b-11f0-aede-f875a4b0f2fb",
    "code": "000000005",
    "name": "Гольфы компрессионные послеоперационные",
    "article": "ART-COMP-002",
    "price": 2100,
    "unit": "Штука",
    "active": true,
    "category": {
      "code": "000000002",
      "name": "Компрессионный трикотаж"
    }
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
        content: `curl -X GET "http://localhost/chvt2025/hs/api/products?limit=10" \\
     -H "Authorization: Basic YWRtaW46cm9vdA==" \\
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
          { label: "id", value: "Уникальный идентификатор товара" },
          { label: "code", value: "Внутренний код товара в 1С" },
          { label: "name", value: "Наименование товара" },
          { label: "article", value: "Артикул товара" },
          { label: "price", value: "Цена товара" },
          { label: "unit", value: "Единица измерения" },
          { label: "active", value: "Статус активности товара" },
          { label: "category", value: "Информация о категории товара" },
        ],
      },
    },
  ],
};
