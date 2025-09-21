"use client";

import { useState, useEffect } from "react";
import { masterClassContent } from "../../constants/masterClassContent";
import { MasterClassAnimationState, Expert } from "../../types/masterclass-new";
import ExpertCard from "./ExpertCard";
import ExpertModal from "./ExpertModal";
import { Users, BookOpen } from "lucide-react";

export default function MasterClassSection() {
  const [animationState, setAnimationState] =
    useState<MasterClassAnimationState>({
      isVisible: false,
      isLoaded: false,
      activeExpert: null,
    });

  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setAnimationState((prev: MasterClassAnimationState) => ({
      ...prev,
      isLoaded: true,
    }));
    const timer = setTimeout(() => {
      setAnimationState((prev: MasterClassAnimationState) => ({
        ...prev,
        isVisible: true,
      }));
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleExpertHover = (expertId: string | null) => {
    setAnimationState((prev: MasterClassAnimationState) => ({
      ...prev,
      activeExpert: expertId,
    }));
  };

  const handleExpertClick = (expert: Expert) => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExpert(null);
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-white to-gray-50 py-12 lg:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="hidden lg:block absolute left-0 top-0 w-1/3 h-full pointer-events-none overflow-hidden opacity-10">
        <div className="absolute top-1/2 -translate-y-1/2 -left-20 flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-20 h-40 bg-gradient-to-b from-chvt-black-600/30 to-chvt-black-800/40 transform -skew-x-12 -rotate-12"
              style={{
                clipPath: "polygon(0 0, 75% 25%, 75% 75%, 0 100%)",
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-orange-500/30 to-transparent animate-pulse" />
        <div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-black-600/20 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="mb-12 lg:mb-16">
          <div
            className={`transition-all duration-1000 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
              <div className="w-8 lg:w-12 h-1 bg-chvt-gradient rounded-full"></div>
              <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                {masterClassContent.title}
              </span>
              <div className="w-8 lg:w-12 h-1 bg-chvt-gradient rounded-full"></div>
            </div>

            <h2 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-black text-chvt-black-900 leading-tight mb-4 lg:mb-6">
              {masterClassContent.subtitle}
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16 lg:mb-20">
          <div className="space-y-6 lg:space-y-8">
            <div
              className={`transition-all duration-1000 ${
                animationState.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="relative">
                <div className="flex items-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                  <div className="w-6 lg:w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ОПИСАНИЕ МАСТЕР-КЛАССА
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                <div className="relative space-y-4 lg:space-y-6">
                  <div className="absolute left-3 lg:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-chvt-orange-500 to-chvt-orange-300"></div>

                  {masterClassContent.description.map(
                    (desc: string, index: number) => (
                      <div
                        key={index}
                        className="group relative pl-10 lg:pl-14"
                        style={{
                          animationDelay: `${0.5 + index * 0.2}s`,
                          transform: animationState.isVisible
                            ? "translateY(0)"
                            : "translateY(20px)",
                          opacity: animationState.isVisible ? 1 : 0,
                          transition: "all 0.6s ease-out",
                        }}
                      >
                        <div className="absolute left-2 lg:left-3 top-3 w-3 h-3 lg:w-4 lg:h-4 bg-chvt-gradient rounded-full border-2 lg:border-4 border-white shadow-lg group-hover:scale-125 group-hover:border-chvt-orange-100 transition-all duration-300 z-10"></div>

                        <div className="relative p-4 lg:p-5 bg-white rounded-r-xl rounded-bl-xl border-l-4 border-chvt-orange-500 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-chvt-orange-600">
                          <div className="flex items-center space-x-2 mb-2 lg:mb-3">
                            <span className="text-xs font-mono text-chvt-orange-600 bg-chvt-orange-100 px-2 py-1 rounded-full font-bold">
                              ШАГ {index + 1}
                            </span>
                            <div className="flex-1 h-px bg-chvt-orange-200"></div>
                          </div>

                          <p className="text-gray-700 leading-relaxed text-base lg:text-lg group-hover:text-gray-900 transition-colors duration-300">
                            {desc}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 ${
              animationState.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <div className="space-y-4 lg:space-y-6">
              <div className="relative">
                <div className="flex items-center space-x-3 lg:space-x-4 mb-6 lg:mb-8">
                  <div className="w-6 lg:w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ТЕХНОЛОГИЧЕСКИЙ СТЕК
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>
              </div>

              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden bg-gradient-to-br from-chvt-black-800 to-chvt-black-900 rounded-xl p-4 lg:p-6 shadow-2xl group-hover:shadow-chvt-orange-500/20 transition-all duration-500">
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                        linear-gradient(90deg, transparent 50%, rgba(249,115,22,0.1) 50%),
                        linear-gradient(0deg, transparent 50%, rgba(249,115,22,0.1) 50%)
                      `,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>

                  <div className="absolute top-0 right-0 w-16 lg:w-24 h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="w-full h-full bg-gradient-to-b from-chvt-orange-500/30 to-chvt-orange-600/40 transform skew-x-12"
                      style={{
                        clipPath: "polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)",
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <div className="flex items-center space-x-2 lg:space-x-3">
                        <div className="w-3 h-3 lg:w-4 lg:h-4 bg-chvt-gradient rounded-full"></div>
                        <span className="text-chvt-orange-400 text-xs lg:text-sm font-mono uppercase tracking-wider">
                          ОСНОВНАЯ ПЛАТФОРМА
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="w-2 h-2 bg-chvt-orange-500 rounded-full"
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-chvt-gradient to-chvt-orange-600 text-white px-4 py-3 lg:px-6 lg:py-4 rounded-lg font-rajdhani text-lg lg:text-2xl font-bold text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10 tracking-wide">
                        {masterClassContent.technologies.primary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 lg:gap-4 pb-8 lg:pb-10">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-2">
                  <div className="w-6 lg:w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ПРЕИМУЩЕСТВА РЕШЕНИЯ
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                <div className="grid gap-2 lg:gap-3">
                  {masterClassContent.technologies.benefits.map(
                    (benefit: string, index: number) => (
                      <div
                        key={index}
                        className="group relative flex items-center p-3 lg:p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300"
                        style={{
                          animationDelay: `${1.2 + index * 0.1}s`,
                          transform: animationState.isVisible
                            ? "translateY(0)"
                            : "translateY(20px)",
                          opacity: animationState.isVisible ? 1 : 0,
                          transition: "all 0.6s ease-out",
                        }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 lg:mr-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                          <svg
                            className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        <p className="text-gray-700 font-medium text-sm lg:text-base group-hover:text-gray-900 transition-colors duration-300">
                          {benefit}
                        </p>

                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-xs font-mono text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            ✓
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 lg:mb-20">
          <div
            className={`transition-all duration-1000 mb-8 lg:mb-12 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.0s" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                <div className="w-12 lg:w-16 h-1 bg-chvt-gradient rounded-full"></div>
                <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                  ГОТОВЫ К ДЕЙСТВИЮ?
                </span>
                <div className="w-12 lg:w-16 h-1 bg-chvt-gradient rounded-full"></div>
              </div>

              <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black text-chvt-black-900">
                СОЗДАЙТЕ СВОЙ API
              </h3>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <div
              className={`transition-all duration-1000 ${
                animationState.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "1.2s" }}
            >
              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 h-full">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                  <div className="w-4 lg:w-6 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    О МАСТЕР-КЛАССЕ
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                <p className="text-gray-700 text-base lg:text-lg leading-relaxed mb-4 lg:mb-6">
                  Пройдите интерактивный мастер-класс за 10 минут и создайте
                  полнофункциональный REST API для 1С:Предприятие
                </p>

                <div className="space-y-2 lg:space-y-3">
                  <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-green-50 rounded-lg border border-green-200">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-700 font-medium text-sm lg:text-base">
                      Полностью бесплатно
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-blue-700 font-medium text-sm lg:text-base">
                      Всего 10 минут времени
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 lg:space-x-3 p-2 lg:p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                    <span className="text-purple-700 font-medium text-sm lg:text-base">
                      Практический опыт работы
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 ${
                animationState.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "1.4s" }}
            >
              <div className="bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                <div className="flex items-center space-x-2 lg:space-x-3 mb-3 lg:mb-4">
                  <div className="w-4 lg:w-6 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    НАЧАТЬ ОБУЧЕНИЕ
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                <div className="flex-1 flex flex-col justify-center space-y-4 lg:space-y-6">
                  <div className="text-center">
                    <h4 className="font-orbitron text-lg lg:text-xl font-bold text-chvt-black-900 mb-2 lg:mb-3">
                      ПРИСТУПИТЬ К СОЗДАНИЮ API
                    </h4>
                    <p className="text-gray-600 text-sm lg:text-base mb-4 lg:mb-6">
                      Начните изучение прямо сейчас и получите готовое решение
                    </p>
                  </div>

                  <div className="space-y-3 lg:space-y-4">
                    <a
                      href="/masterclass"
                      className="group relative w-full inline-flex items-center justify-center px-4 py-3 lg:px-6 lg:py-4 bg-gradient-to-r from-chvt-orange-500 to-chvt-orange-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                    >
                      <span className="relative z-10 flex items-center space-x-2">
                        <svg
                          className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:rotate-12 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        <span className="text-sm lg:text-base">
                          Начать мастер-класс
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:-translate-x-full transition-transform duration-500"></div>
                    </a>

                    <button
                      className="group w-full inline-flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-300 hover:border-chvt-orange-500 hover:text-chvt-orange-600 hover:bg-chvt-orange-50"
                      onClick={() => {
                        const element =
                          document.getElementById("experts-section");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span className="flex items-center space-x-2">
                        <Users className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm lg:text-base">
                          Узнать об экспертах
                        </span>
                      </span>
                    </button>

                    <a
                      href="/docs"
                      className="group w-full inline-flex items-center justify-center px-4 py-2 lg:px-6 lg:py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg transition-all duration-300 hover:border-chvt-orange-500 hover:text-chvt-orange-600 hover:bg-chvt-orange-50"
                    >
                      <span className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 transform group-hover:scale-110 transition-transform" />
                        <span className="text-sm lg:text-base">
                          Просмотреть документацию
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="experts-section">
          <div
            className={`transition-all duration-1000 mb-8 lg:mb-12 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 lg:space-x-4 mb-4 lg:mb-6">
                <div className="w-12 lg:w-16 h-1 bg-chvt-gradient rounded-full"></div>
                <span className="font-mono text-xs lg:text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                  ЭКСПЕРТЫ МАСТЕР-КЛАССА
                </span>
                <div className="w-12 lg:w-16 h-1 bg-chvt-gradient rounded-full"></div>
              </div>

              <h3 className="font-orbitron text-2xl sm:text-3xl lg:text-4xl font-black text-chvt-black-900">
                КОМАНДА ПРОФЕССИОНАЛОВ
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {masterClassContent.experts.map((expert: Expert, index: number) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                isActive={animationState.activeExpert === expert.id}
                onHover={handleExpertHover}
                onClick={handleExpertClick}
                delay={1500 + index * 200}
              />
            ))}
          </div>
        </div>

        {/* Expert Modal */}
        <ExpertModal
          expert={selectedExpert}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
