"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Settings,
  Database,
  Code,
  Server,
  Mic,
  ChevronDown,
  ChevronRight,
  Home,
  Layers,
  Globe,
  FileText,
  Shield,
  Package,
  FolderOpen,
  Play,
  Terminal,
  List,
  Tag,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<React.ComponentProps<"svg">>;
  children?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    title: "Начало работы",
    href: "/docs",
    icon: Home,
    children: [
      { title: "Введение", href: "/docs/introduction", icon: BookOpen },
      {
        title: "Требования к системе",
        href: "/docs/requirements",
        icon: Shield,
      },
    ],
  },
  {
    title: "Подготовка системы",
    href: "/docs/setup",
    icon: Database,
    children: [
      {
        title: "Создание базы 1С",
        href: "/docs/database-setup",
        icon: Database,
      },
      {
        title: "Запуск конфигуратора",
        href: "/docs/configurator",
        icon: Settings,
      },
    ],
  },
  {
    title: "Настройка конфигурации",
    href: "/docs/configuration",
    icon: Layers,
    children: [
      {
        title: "Справочники",
        href: "/docs/configuration/catalogs",
        icon: FolderOpen,
      },
      { title: "Перечисления", href: "/docs/configuration/enums", icon: List },
    ],
  },
  {
    title: "HTTP-сервисы",
    href: "/docs/http-services",
    icon: Server,
    children: [
      { title: "Обзор сервисов", href: "/docs/http-services", icon: Code },
      {
        title: "Общий модуль",
        href: "/docs/http-services/module",
        icon: FileText,
      },
    ],
  },
  {
    title: "Настройка Apache",
    href: "/docs/apache-setup",
    icon: Terminal,
    children: [
      {
        title: "Установка Apache",
        href: "/docs/apache-setup/installation",
        icon: Package,
      },
      {
        title: "Настройка конфигурации",
        href: "/docs/apache-setup/configuration",
        icon: Settings,
      },
      {
        title: "Публикация в 1С",
        href: "/docs/apache-setup/publishing",
        icon: Globe,
      },
    ],
  },
  {
    title: "API документация",
    href: "/docs/api",
    icon: Globe,
    children: [
      { title: "Обзор API", href: "/docs/api", icon: FileText },
      { title: "Примеры интеграции", href: "/docs/api/examples", icon: Code },
      { title: "API Товаров", href: "/docs/api/products", icon: Package },
      { title: "API Категорий", href: "/docs/api/categories", icon: Tag },
    ],
  },
  {
    title: "Голосовой поиск",
    href: "/docs/voice-search",
    icon: Mic,
    children: [
      {
        title: "Установка Node.js",
        href: "/docs/voice-search/nodejs",
        icon: Play,
      },
      {
        title: "Настройка приложения",
        href: "/docs/voice-search/setup",
        icon: Settings,
      },
      {
        title: "Запуск системы",
        href: "/docs/voice-search/running",
        icon: Terminal,
      },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>(() => {
    const activeSection = navigation.find(
      (section) =>
        section.children?.some((child) => pathname === child.href) ||
        pathname === section.href
    );
    return activeSection ? [activeSection.href] : [];
  });

  const toggleSection = (href: string) => {
    setExpandedSections((prev) =>
      prev.includes(href)
        ? prev.filter((section) => section !== href)
        : [...prev, href]
    );
  };

  const isActive = (href: string) => pathname === href;
  const isSectionActive = (section: NavItem) =>
    section.children?.some((child) => pathname === child.href) ||
    pathname === section.href;

  return (
    <div className="w-full bg-white border-r border-gray-200 min-h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black">Документация</h2>
            <p className="text-sm text-gray-600">ЧВТ 2025</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigation.map((section) => {
            const isExpanded = expandedSections.includes(section.href);
            const hasActiveChild = isSectionActive(section);

            return (
              <div key={section.href} className="space-y-1">
                {/* Основная секция */}
                <div
                  onClick={() =>
                    section.children && toggleSection(section.href)
                  }
                  className={`
                    flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${
                      hasActiveChild
                        ? "bg-orange-50 text-orange-900 border border-orange-200"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    {section.icon && (
                      <section.icon
                        className={`h-5 w-5 ${
                          hasActiveChild ? "text-orange-600" : "text-gray-500"
                        }`}
                      />
                    )}
                    <span className="font-medium text-sm">{section.title}</span>
                    {section.badge && (
                      <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  {section.children && (
                    <div className="flex-shrink-0">
                      {isExpanded ? (
                        <ChevronDown
                          className={`h-4 w-4 ${
                            hasActiveChild ? "text-orange-600" : "text-gray-400"
                          }`}
                        />
                      ) : (
                        <ChevronRight
                          className={`h-4 w-4 ${
                            hasActiveChild ? "text-orange-600" : "text-gray-400"
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Дочерние элементы */}
                {section.children && isExpanded && (
                  <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                    {section.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`
                          flex items-center gap-3 p-2 rounded-lg text-sm transition-all duration-200
                          ${
                            isActive(child.href)
                              ? "bg-orange-500 text-white shadow-sm"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          }
                        `}
                      >
                        {child.icon && (
                          <child.icon
                            className={`h-4 w-4 ${
                              isActive(child.href)
                                ? "text-white"
                                : "text-gray-400"
                            }`}
                          />
                        )}
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
