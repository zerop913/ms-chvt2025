"use client";

import { useState, useEffect } from "react";
import { masterClassContent } from "@/constants/masterClassSteps";
import { CodeEditor } from "@/components/CodeEditor";
import { MasterClassStep } from "@/types/masterclass";

export default function MasterClassPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState<number[]>(
    new Array(masterClassContent.length).fill(0)
  );
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("ru-RU", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval);
  }, []);

  const handleStepComplete = (stepIndex: number, score: number) => {
    const newProgress = [...progress];
    newProgress[stepIndex] = score;
    setProgress(newProgress);
  };

  const nextStep = () => {
    if (currentStep < masterClassContent.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalScore = progress.reduce((sum, score) => sum + score, 0);
  const maxScore = masterClassContent.length * 100;
  const progressPercentage = (totalScore / maxScore) * 100;

  return (
    <div className="relative min-h-screen w-full bg-chvt-dark overflow-hidden font-sans">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-chvt-orange-500/5 via-transparent to-chvt-dark/50"></div>
      </div>

      {/* Time Display */}
      <div className="absolute top-8 right-8 z-20">
        <div className="relative">
          <span className="bg-chvt-black-900 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg border border-chvt-orange-500/20">
            {currentTime}
          </span>
          <div className="absolute -inset-1 bg-chvt-orange-500/20 rounded-lg blur-sm animate-pulse"></div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-16 pb-8 px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            {/* Title with background plates */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-chvt-black-900/40 backdrop-blur-sm rounded-2xl border border-chvt-orange-500/20"></div>
              <div className="relative p-8">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
                  <span className="bg-chvt-gradient bg-clip-text text-transparent">
                    МАСТЕР-КЛАСС
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 mb-6 font-light">
                  Создание API для каталога товаров в{" "}
                  <span className="text-chvt-orange-500 font-semibold">
                    1С:Предприятие
                  </span>
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <span className="bg-chvt-black-900 px-3 py-1 rounded border border-chvt-orange-500/20">
                    6 ШАГОВ
                  </span>
                  <div className="w-8 h-px bg-chvt-orange-500"></div>
                  <span className="bg-chvt-black-900 px-3 py-1 rounded border border-chvt-orange-500/20">
                    ПРАКТИКА
                  </span>
                  <div className="w-8 h-px bg-chvt-orange-500"></div>
                  <span className="bg-chvt-black-900 px-3 py-1 rounded border border-chvt-orange-500/20">
                    BSL КОД
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-chvt-black-900/30 backdrop-blur-sm rounded-xl border border-chvt-orange-500/20"></div>
              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-semibold">ПРОГРЕСС</span>
                  <span className="text-chvt-orange-500 font-bold">
                    {Math.round(progressPercentage)}% ({totalScore}/{maxScore})
                  </span>
                </div>

                <div className="bg-chvt-black-900/50 rounded-full h-3 border border-chvt-orange-500/20">
                  <div
                    className="bg-chvt-gradient h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Navigation */}
            <div className="flex justify-center space-x-2 mb-8">
              {masterClassContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`relative w-12 h-12 rounded-lg font-bold text-sm transition-all duration-300 ${
                    index === currentStep
                      ? "bg-chvt-gradient text-white scale-110 shadow-2xl"
                      : progress[index] > 0
                      ? "bg-green-600 text-white hover:scale-105"
                      : "bg-chvt-black-900 text-gray-400 hover:bg-chvt-black-800 border border-chvt-orange-500/20"
                  }`}
                >
                  {index + 1}
                  {index === currentStep && (
                    <div className="absolute -inset-1 bg-chvt-orange-500/30 rounded-lg blur-sm animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <CodeEditor
            step={masterClassContent[currentStep]}
            stepIndex={currentStep}
            onComplete={(score) => handleStepComplete(currentStep, score)}
            currentScore={progress[currentStep]}
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`relative px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                currentStep === 0
                  ? "bg-chvt-black-900/50 text-gray-600 cursor-not-allowed border border-gray-700"
                  : "bg-chvt-black-900 text-white hover:bg-chvt-black-800 border border-chvt-orange-500/20 hover:border-chvt-orange-500/40"
              }`}
            >
              ← ПРЕДЫДУЩИЙ
              {currentStep !== 0 && (
                <div className="absolute -inset-1 bg-chvt-orange-500/10 rounded-lg blur-sm opacity-0 hover:opacity-100 transition-opacity"></div>
              )}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === masterClassContent.length - 1}
              className={`relative px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 ${
                currentStep === masterClassContent.length - 1
                  ? "bg-chvt-black-900/50 text-gray-600 cursor-not-allowed border border-gray-700"
                  : "bg-chvt-gradient text-white hover:scale-105 shadow-xl"
              }`}
            >
              СЛЕДУЮЩИЙ →
              {currentStep !== masterClassContent.length - 1 && (
                <div className="absolute -inset-1 bg-chvt-orange-500/30 rounded-lg blur-sm animate-pulse"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {progressPercentage === 100 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-0 bg-chvt-gradient rounded-2xl blur-lg opacity-50"></div>
            <div className="relative bg-chvt-black-900 p-12 rounded-2xl border border-chvt-orange-500/30 text-center">
              <h2 className="text-4xl font-black text-white mb-6">
                <span className="bg-chvt-gradient bg-clip-text text-transparent">
                  🎉 ПОЗДРАВЛЯЕМ!
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Вы успешно завершили мастер-класс по созданию API в
                1С:Предприятие!
              </p>
              <p className="text-gray-400 mb-8">
                Теперь вы знаете, как создавать полноценные HTTP-сервисы,
                работать с JSON, обрабатывать ошибки и оптимизировать код на
                языке 1С.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-chvt-gradient text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider hover:scale-105 transition-transform"
              >
                НАЧАТЬ ЗАНОВО
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
