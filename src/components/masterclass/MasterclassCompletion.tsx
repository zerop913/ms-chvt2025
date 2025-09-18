import React, { useState } from "react";
import { MasterclassState } from "@/types/masterclass-new";
import MasterclassService from "@/utils/masterclassService";
import { Trophy, Copy, Eye, EyeOff, Home, RotateCcw, Code } from "lucide-react";

interface MasterclassCompletionProps {
  state: MasterclassState;
  onRestart: () => void;
  onGoHome: () => void;
}

export const MasterclassCompletion: React.FC<MasterclassCompletionProps> = ({
  state,
  onRestart,
  onGoHome,
}) => {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const masterclassService = MasterclassService.getInstance();
  const completeCode = masterclassService.getCompleteCode();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(completeCode.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden font-sans">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-chvt-orange-500/10 via-transparent to-chvt-orange-500/5" />
      </div>

      <div className="absolute right-0 top-0 w-2/3 h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 right-0 flex space-x-4 opacity-20">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-24 h-48 bg-gradient-to-b from-chvt-orange-500/40 to-chvt-orange-600/60 transform skew-x-12 rotate-12"
              style={{
                clipPath: "polygon(0 0, 100% 25%, 100% 75%, 0 100%)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-orange-500/40 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-chvt-black-900/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex justify-center mb-6 lg:mb-8">
            <div className="relative">
              <div className="relative bg-gradient-to-br from-chvt-orange-500 to-chvt-orange-600 p-4 lg:p-6 rounded-full shadow-2xl">
                <Trophy className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-chvt-black-900 via-chvt-orange-600 to-chvt-black-900 bg-clip-text text-transparent leading-tight">
              Поздравляем!
            </h1>
            <div className="h-1 w-24 lg:w-32 bg-gradient-to-r from-chvt-orange-500 to-chvt-orange-600 mx-auto rounded-full" />
            <p className="text-lg sm:text-xl lg:text-2xl text-chvt-black-700 max-w-3xl mx-auto leading-relaxed px-4">
              Вы успешно завершили мастер-класс по HTTP-сервисам в 1С
            </p>
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-chvt-orange-50 to-white border border-chvt-orange-200 rounded-full px-4 lg:px-6 py-2 lg:py-3">
              <div className="w-2 h-2 bg-chvt-orange-500 rounded-full" />
              <span className="text-chvt-orange-700 font-medium text-sm lg:text-base">
                Мастер-класс завершен
              </span>
            </div>
          </div>
        </div>

        <div className="mb-12 lg:mb-16">
          <div className="space-y-3 lg:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <h3 className="text-base lg:text-lg font-semibold text-black flex items-center">
                <Code className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Готовый код HTTP-сервиса
              </h3>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowCode(!showCode)}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                >
                  {showCode ? (
                    <>
                      <EyeOff className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 inline" />
                      <span className="hidden sm:inline">Скрыть код</span>
                      <span className="sm:hidden">Скрыть</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2 inline" />
                      <span className="hidden sm:inline">Показать код</span>
                      <span className="sm:hidden">Показать</span>
                    </>
                  )}
                </button>
                {showCode && (
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center space-x-1 lg:space-x-2 px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm"
                  >
                    <Copy className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">
                      {copied ? "Скопировано!" : "Копировать готовый код"}
                    </span>
                    <span className="sm:hidden">
                      {copied ? "✓" : "Копировать"}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {showCode && (
              <>
                <div
                  className="bg-white border-2 border-black rounded-lg p-3 lg:p-6 font-mono text-xs lg:text-sm overflow-x-auto"
                  style={{
                    overflowX: "auto",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <pre className="text-gray-800 whitespace-pre-wrap">
                    {completeCode.code}
                  </pre>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-chvt-orange-200/50 rounded-xl p-4 lg:p-6 shadow-lg">
                  <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
                    <div className="space-y-2 lg:space-y-3">
                      <h4 className="font-bold text-chvt-black-800 text-base lg:text-lg">
                        Особенности реализации:
                      </h4>
                      <ul className="space-y-2">
                        {completeCode.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start text-chvt-black-700"
                          >
                            <div className="w-2 h-2 bg-chvt-orange-500 rounded-full mt-1.5 lg:mt-2 mr-2 lg:mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                      <h4 className="font-bold text-chvt-black-800 text-base lg:text-lg">
                        API Endpoints:
                      </h4>
                      <ul className="space-y-2">
                        {completeCode.endpoints.map((endpoint, index) => (
                          <li
                            key={index}
                            className="bg-chvt-orange-50 border border-chvt-orange-200 rounded-lg px-2 lg:px-3 py-2"
                          >
                            <code className="text-xs lg:text-sm text-chvt-orange-800 font-mono break-all">
                              {endpoint}
                            </code>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-white border-2 border-chvt-orange-200 text-chvt-black-700 rounded-xl hover:bg-chvt-orange-50 hover:border-chvt-orange-300 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
            Пройти заново
          </button>
          <button
            onClick={onGoHome}
            className="w-full sm:w-auto flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-chvt-orange-500 to-chvt-orange-600 text-white rounded-xl hover:from-chvt-orange-600 hover:to-chvt-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
            На главную
          </button>
        </div>
      </div>

      {copied && (
        <div className="fixed top-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {copied}
        </div>
      )}
    </section>
  );
};
