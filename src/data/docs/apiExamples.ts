export const apiExamplesData = {
  title: "Примеры интеграции",
  description: "Практические примеры работы с API",

  sections: [
    {
      type: "codeBlock" as const,
      icon: "Globe" as const,
      title: "Базовый пример JavaScript",
      description: "Получение категорий и товаров с помощью JavaScript",
      data: {
        content: `// Базовые настройки
const API_BASE = 'http://localhost/chvt2025/hs/api';
const AUTH = 'Basic ' + btoa('admin:root');

// Получить категории
async function getCategories() {
  const response = await fetch(\`\${API_BASE}/categories\`, {
    headers: { 'Authorization': AUTH }
  });
  const data = await response.json();
  return data.categories;
}

// Получить товары
async function getProducts(limit = 10) {
  const response = await fetch(\`\${API_BASE}/products?limit=\${limit}\`, {
    headers: { 'Authorization': AUTH }
  });
  const data = await response.json();
  return data.products;
}

// Использование
getCategories().then(categories => {
  console.log('Категории:', categories);
});

getProducts(5).then(products => {
  console.log('Товары:', products);
});`,
      },
    },
    {
      type: "codeBlock" as const,
      icon: "Mic" as const,
      title: "Голосовой поиск (React)",
      description: "React компонент с голосовым управлением",
      data: {
        content: `import { useState } from 'react';

function VoiceSearch() {
  const [isListening, setIsListening] = useState(false);
  const [searchText, setSearchText] = useState('');

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Браузер не поддерживает голосовой ввод');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSearchText(text);
      searchProducts(text);
    };
    
    recognition.start();
  };

  const searchProducts = async (query) => {
    // Поиск в API (упрощенная версия)
    console.log('Поиск:', query);
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? 'Слушаю...' : 'Начать голосовой поиск'}
      </button>
      {searchText && <p>Результат: {searchText}</p>}
    </div>
  );
}`,
      },
    },
    {
      type: "highlightBox" as const,
      icon: "Code" as const,
      title: "Полезные советы",
      description: "Рекомендации по работе с API",
      data: {
        items: [
          "Всегда используйте HTTPS в продакшене",
          "Реализуйте обработку ошибок для всех запросов",
          "Кэшируйте часто запрашиваемые данные",
          "Используйте пагинацию для больших списков",
          "Добавляйте timeout для запросов",
        ],
      },
    },
  ],
};
