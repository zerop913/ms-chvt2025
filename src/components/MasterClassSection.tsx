"use client";

import { useState, useEffect } from "react";
import { masterClassContent } from "../constants/masterClassContent";
import { MasterClassAnimationState } from "../types/masterclass";
import ExpertCard from "./ExpertCard";

export default function MasterClassSection() {
  const [animationState, setAnimationState] =
    useState<MasterClassAnimationState>({
      isVisible: false,
      isLoaded: false,
      activeExpert: null,
    });

  useEffect(() => {
    setAnimationState((prev) => ({ ...prev, isLoaded: true }));
    const timer = setTimeout(() => {
      setAnimationState((prev) => ({ ...prev, isVisible: true }));
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleExpertHover = (expertId: string | null) => {
    setAnimationState((prev) => ({ ...prev, activeExpert: expertId }));
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-white to-gray-50 py-20 overflow-hidden">
      {/* Background Grid */}
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

      {/* Chevron Background Pattern */}
      <div className="absolute left-0 top-0 w-1/3 h-full pointer-events-none overflow-hidden opacity-10">
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

      {/* Dynamic Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-orange-500/30 to-transparent animate-pulse" />
        <div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-black-600/20 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-16">
          <div
            className={`transition-all duration-1000 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-1 bg-chvt-gradient rounded-full"></div>
              <span className="font-mono text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                {masterClassContent.title}
              </span>
              <div className="w-12 h-1 bg-chvt-gradient rounded-full"></div>
            </div>

            <h2 className="font-orbitron text-4xl lg:text-6xl font-black text-chvt-black-900 leading-tight mb-6">
              {masterClassContent.subtitle}
            </h2>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Interactive Description Block */}
          <div className="space-y-8">
            {/* Main Description with Interactive Elements */}
            <div
              className={`transition-all duration-1000 ${
                animationState.isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="relative">
                {/* Unified Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ОПИСАНИЕ МАСТЕР-КЛАССА
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                {/* Timeline-style Description Cards */}
                <div className="relative space-y-6">
                  {/* Timeline line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-chvt-orange-500 to-chvt-orange-300"></div>

                  {masterClassContent.description.map((desc, index) => (
                    <div
                      key={index}
                      className="group relative pl-14"
                      style={{
                        animationDelay: `${0.5 + index * 0.2}s`,
                        transform: animationState.isVisible
                          ? "translateY(0)"
                          : "translateY(20px)",
                        opacity: animationState.isVisible ? 1 : 0,
                        transition: "all 0.6s ease-out",
                      }}
                    >
                      {/* Timeline node */}
                      <div className="absolute left-3 top-3 w-4 h-4 bg-chvt-gradient rounded-full border-4 border-white shadow-lg group-hover:scale-125 group-hover:border-chvt-orange-100 transition-all duration-300 z-10"></div>

                      {/* Card content */}
                      <div className="relative p-5 bg-white rounded-r-xl rounded-bl-xl border-l-4 border-chvt-orange-500 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:border-chvt-orange-600">
                        {/* Step indicator */}
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-xs font-mono text-chvt-orange-600 bg-chvt-orange-100 px-2 py-1 rounded-full font-bold">
                            ШАГ {index + 1}
                          </span>
                          <div className="flex-1 h-px bg-chvt-orange-200"></div>
                        </div>

                        <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-900 transition-colors duration-300">
                          {desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Interactive Technologies */}
          <div
            className={`transition-all duration-1000 ${
              animationState.isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <div className="space-y-6">
              {/* Unified Tech Stack Header */}
              <div className="relative">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ТЕХНОЛОГИЧЕСКИЙ СТЕК
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>
              </div>

              {/* Main Technology - Interactive Core */}
              <div className="relative group cursor-pointer">
                <div className="relative overflow-hidden bg-gradient-to-br from-chvt-black-800 to-chvt-black-900 rounded-xl p-6 shadow-2xl group-hover:shadow-chvt-orange-500/20 transition-all duration-500">
                  {/* Animated background circuit */}
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

                  {/* Floating chevrons */}
                  <div className="absolute top-0 right-0 w-24 h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <div
                      className="w-full h-full bg-gradient-to-b from-chvt-orange-500/30 to-chvt-orange-600/40 transform skew-x-12"
                      style={{
                        clipPath: "polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)",
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10">
                    {/* Core Technology Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-chvt-gradient rounded-full"></div>
                        <span className="text-chvt-orange-400 text-sm font-mono uppercase tracking-wider">
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

                    {/* Main Tech Display */}
                    <div className="bg-gradient-to-r from-chvt-gradient to-chvt-orange-600 text-white px-6 py-4 rounded-lg font-rajdhani text-2xl font-bold text-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-white/10 transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                      <span className="relative z-10 tracking-wide">
                        {masterClassContent.technologies.primary}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits moved here */}
              <div className="grid gap-4 pb-40">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-1 bg-chvt-gradient rounded-full"></div>
                  <span className="font-mono text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                    ПРЕИМУЩЕСТВА РЕШЕНИЯ
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-chvt-orange-500 to-transparent"></div>
                </div>

                {/* Feature-style Benefits Grid */}
                <div className="grid gap-3">
                  {masterClassContent.technologies.benefits.map(
                    (benefit, index) => (
                      <div
                        key={index}
                        className="group relative flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50/50 transition-all duration-300"
                        style={{
                          animationDelay: `${1.2 + index * 0.1}s`,
                          transform: animationState.isVisible
                            ? "translateY(0)"
                            : "translateY(20px)",
                          opacity: animationState.isVisible ? 1 : 0,
                          transition: "all 0.6s ease-out",
                        }}
                      >
                        {/* Check icon */}
                        <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 group-hover:bg-green-600 transition-all duration-300">
                          <svg
                            className="w-3 h-3 text-white"
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

                        {/* Benefit text */}
                        <p className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                          {benefit}
                        </p>

                        {/* Success indicator on hover */}
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

        {/* Call to Action Section */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ${
            animationState.isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "1.0s" }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-chvt-black-900 to-chvt-orange-900 rounded-2xl p-8 lg:p-12 text-center relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              <div className="relative z-10">
                <h3 className="font-orbitron text-3xl lg:text-4xl font-black text-white mb-4">
                  ГОТОВЫ СОЗДАТЬ СВОЙ API?
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  Пройдите интерактивный мастер-класс за 10 минут и создайте
                  полнофункциональный REST API для 1С:Предприятие
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/masterclass"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-chvt-orange-500 to-chvt-orange-600 text-white font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25"
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
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
                      <span>Начать интерактивный курс</span>
                    </span>
                    <div className="absolute inset-0 bg-white/10 transform translate-x-full group-hover:-translate-x-full transition-transform duration-500"></div>
                  </a>

                  <button
                    className="group relative inline-flex items-center justify-center px-8 py-4 border border-gray-400 text-gray-300 font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:border-white hover:text-white"
                    onClick={() => {
                      const element =
                        document.getElementById("experts-section");
                      element?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                        />
                      </svg>
                      <span>Узнать об экспертах</span>
                    </span>
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Бесплатно</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-blue-500"
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
                    <span>~10 минут</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-purple-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                    <span>Готовый код</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Experts Section */}
        <div id="experts-section">
          <div
            className={`transition-all duration-1000 mb-12 ${
              animationState.isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "1.2s" }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-1 bg-chvt-gradient rounded-full"></div>
                <span className="font-mono text-sm text-chvt-orange-600 font-bold uppercase tracking-wider">
                  ЭКСПЕРТЫ МАСТЕР-КЛАССА
                </span>
                <div className="w-16 h-1 bg-chvt-gradient rounded-full"></div>
              </div>

              <h3 className="font-orbitron text-3xl lg:text-4xl font-black text-chvt-black-900">
                КОМАНДА ПРОФЕССИОНАЛОВ
              </h3>
            </div>
          </div>

          {/* Experts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {masterClassContent.experts.map((expert, index) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                isActive={animationState.activeExpert === expert.id}
                onHover={handleExpertHover}
                delay={1500 + index * 200}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
