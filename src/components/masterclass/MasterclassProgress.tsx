import React from "react";
import { MasterclassState } from "@/types/masterclass-new";
import MasterclassService from "@/utils/masterclassService";

interface MasterclassProgressProps {
  state: MasterclassState;
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
}

export const MasterclassProgress: React.FC<MasterclassProgressProps> = ({
  state,
  currentStep,
  onStepChange,
}) => {
  const masterclassService = MasterclassService.getInstance();
  const overallProgress = masterclassService.getOverallProgress(state);

  const getStepStatus = (stepIndex: number) => {
    const progress = state.userProgress[stepIndex];
    if (progress.completed) return "completed";
    if (stepIndex === currentStep) return "current";
    if (stepIndex < currentStep) return "available";
    return "locked";
  };

  const getStepIcon = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    switch (status) {
      case "completed":
        return "✓";
      case "current":
        return "→";
      case "available":
        return stepIndex + 1;
      case "locked":
        return "🔒";
      default:
        return stepIndex + 1;
    }
  };

  const getStepColor = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "current":
        return "bg-orange-500 text-white";
      case "available":
        return "bg-white text-gray-700 border-2 border-gray-300 hover:border-orange-300";
      case "locked":
        return "bg-gray-200 text-gray-400";
      default:
        return "bg-gray-200 text-gray-400";
    }
  };

  const canNavigateToStep = (stepIndex: number) => {
    if (stepIndex === currentStep) return false;
    if (stepIndex < currentStep) return true;
    if (
      stepIndex === currentStep + 1 &&
      state.userProgress[currentStep]?.completed
    )
      return true;
    return false;
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 lg:py-4">
        <div className="mb-3 lg:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-1 sm:space-y-0">
            <h2 className="text-base lg:text-lg font-semibold text-gray-900">
              Мастер-класс: HTTP-сервисы в 1С
            </h2>
            <div className="text-xs lg:text-sm text-gray-600">
              Общий прогресс: {overallProgress}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 lg:h-2">
            <div
              className="bg-orange-500 h-1.5 lg:h-2 rounded-full transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between overflow-x-auto pb-2 lg:pb-0">
          {state.userProgress.map((progress, index) => {
            const step = masterclassService.getStep(index);
            const canNavigate = canNavigateToStep(index);

            return (
              <div
                key={index}
                className="flex flex-col items-center relative flex-shrink-0 mx-1 lg:mx-0"
              >
                {index < state.userProgress.length - 1 && (
                  <div className="absolute top-4 lg:top-6 left-full w-full h-0.5 bg-gray-300 -z-10 hidden sm:block" />
                )}

                <button
                  onClick={() => canNavigate && onStepChange(index)}
                  disabled={!canNavigate}
                  className={`
                    w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold
                    transition-all duration-200 relative z-10
                    ${getStepColor(index)}
                    ${
                      canNavigate
                        ? "cursor-pointer transform hover:scale-110"
                        : "cursor-not-allowed"
                    }
                  `}
                >
                  {getStepIcon(index)}
                </button>

                <div className="mt-1 lg:mt-2 text-center max-w-[80px] lg:max-w-[120px]">
                  <div className="text-xs text-gray-600 font-medium truncate">
                    {step?.title || `Шаг ${index + 1}`}
                  </div>
                  {progress.score > 0 && (
                    <div
                      className={`text-xs mt-1 ${
                        progress.completed
                          ? "text-green-600"
                          : "text-orange-600"
                      }`}
                    >
                      {progress.score}%
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="flex flex-col items-center flex-shrink-0 mx-1 lg:mx-0">
            <div
              className={`
              w-8 h-8 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold
              ${
                overallProgress === 100
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-400"
              }
            `}
            >
              🏆
            </div>
            <div className="mt-1 lg:mt-2 text-center max-w-[80px] lg:max-w-[120px]">
              <div className="text-xs text-gray-600 font-medium">
                Завершение
              </div>
              {overallProgress === 100 && (
                <div className="text-xs text-green-600 mt-1">Готово!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
