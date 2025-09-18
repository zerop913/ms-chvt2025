"use client";

export default function Footer() {
  return (
    <footer className="w-full py-4 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Copyright */}
          <div className="text-sm text-gray-600">
            &copy; Чемпионат Высоких Технологий 2025
          </div>

          {/* Made by */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">made by</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Перейти на сайт разработчика Ivan Smolin"
              href="https://ivan-smolin.ru"
            >
              <div>
                <img
                  alt=""
                  loading="lazy"
                  width="14"
                  height="14"
                  decoding="async"
                  className="w-3.5 h-3.5 filter brightness-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                  src="https://ivan-smolin.ru/favicon.svg"
                />
              </div>
              <span className="font-medium">ivan-smolin.ru</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
