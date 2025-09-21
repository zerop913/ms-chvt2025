"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Database,
  Settings,
  Globe,
  Mic,
  Code,
  ArrowRight,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <div className="w-full px-[100px] py-20">
        <article className="max-w-none">
          {/* Заголовок страницы */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="h-8 w-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-black">
                Документация ЧВТ 2025
              </h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Полный мастер-класс по созданию HTTP-сервисов в 1С с голосовым
              поиском
            </p>
          </header>

          {/* Разделы документации */}
          <div className="space-y-8 mb-16">
            <Link
              href="/docs/introduction"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      Начало работы
                    </h3>
                    <p className="text-gray-600">
                      Введение в мастер-класс, требования к системе и обзор
                      проекта
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>

            <Link
              href="/docs/database-setup"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      Создание базы 1С
                    </h3>
                    <p className="text-gray-600">
                      Пошаговое создание новой информационной базы 1С для
                      разработки
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>

            <Link
              href="/docs/configuration"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      Настройка конфигурации
                    </h3>
                    <p className="text-gray-600">
                      Создание справочников, перечислений и регистров сведений
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>

            <Link
              href="/docs/http-services"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      HTTP-сервисы
                    </h3>
                    <p className="text-gray-600">
                      Создание и настройка HTTP-сервисов для API
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>

            <Link
              href="/docs/apache-setup"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      Настройка Apache
                    </h3>
                    <p className="text-gray-600">
                      Установка и настройка веб-сервера Apache для публикации
                      API
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>

            <Link
              href="/docs/voice-search"
              className="block p-6 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black group-hover:text-orange-600 mb-1">
                      Голосовой поиск
                    </h3>
                    <p className="text-gray-600">
                      Настройка Node.js приложения для голосового поиска
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500" />
              </div>
            </Link>
          </div>

          {/* Важная информация */}
          <div className="mt-12 p-6 border-l-4 border-orange-500 bg-orange-50">
            <div className="flex gap-4">
              <div>
                <p className="text-black font-medium mb-2">
                  Важные рекомендации
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Проходите разделы последовательно, так как каждый этап зависит
                  от предыдущего. Убедитесь, что у вас есть административные
                  права на компьютере для выполнения всех операций.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
