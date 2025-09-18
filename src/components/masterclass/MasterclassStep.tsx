import React, { useState, useEffect } from "react";
import { MasterclassCodeStep, UserProgress } from "@/types/masterclass-new";
import { InteractiveCodeDisplay } from "./InteractiveCodeDisplay";
import MasterclassService from "@/utils/masterclassService";

interface MasterclassStepProps {
  step: MasterclassCodeStep;
  stepIndex: number;
  progress: UserProgress;
  onProgressUpdate: (
    stepIndex: number,
    answers: Record<string, string>
  ) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete?: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastStep?: boolean;
  allStepsHaveAnswers?: boolean;
}

export const MasterclassStep: React.FC<MasterclassStepProps> = ({
  step,
  stepIndex,
  progress,
  onProgressUpdate,
  onNext,
  onPrevious,
  onComplete,
  canGoNext,
  canGoPrevious,
  isLastStep = false,
  allStepsHaveAnswers = false,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showSolution, setShowSolution] = useState(false);
  const [startTime] = useState(Date.now());

  const masterclassService = MasterclassService.getInstance();

  useEffect(() => {
    const initialAnswers: Record<string, string> = {};
    step.blanks.forEach((blank) => {
      if (progress.completedBlanks.includes(blank.id)) {
        initialAnswers[blank.id] = blank.correctAnswer;
      }
    });
    setAnswers(initialAnswers);
    setShowSolution(false);
  }, [step, stepIndex]);

  const handleAnswerChange = (blankId: string, value: string) => {
    const newAnswers = { ...answers, [blankId]: value };
    setAnswers(newAnswers);

    onProgressUpdate(stepIndex, newAnswers);
  };

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  const handleHideSolution = () => {
    setShowSolution(false);
  };

  const handleAutoFill = () => {
    const autoFilledAnswers: Record<string, string> = {};
    step.blanks.forEach((blank) => {
      autoFilledAnswers[blank.id] = blank.correctAnswer;
    });
    setAnswers(autoFilledAnswers);
    onProgressUpdate(stepIndex, autoFilledAnswers);
  };

  const allAnswersCorrect =
    masterclassService.calculateStepScore(stepIndex, answers) === 100;
  const allAnswered = step.blanks.every((blank) => answers[blank.id]);

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-6">
      <div className="mb-4 lg:mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3 lg:mb-4 space-y-2 lg:space-y-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
            Шаг {stepIndex + 1}: {step.title}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Прогресс: {progress.score}%
            </div>
            {progress.completed && (
              <div className="px-3 py-1 bg-gray-100 text-black rounded-full text-sm font-medium flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Выполнено
              </div>
            )}
          </div>
        </div>
        <p className="text-base lg:text-lg text-gray-700 mb-3 lg:mb-4">
          {step.description}
        </p>
      </div>

      <div className="mb-4 lg:mb-6">
        <h2 className="text-lg lg:text-xl font-semibold text-black mb-2 lg:mb-3 flex items-center">
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          Теория
        </h2>
        <div className="bg-white border border-gray-200 rounded-lg p-3 lg:p-4">
          <ul className="space-y-2">
            {step.theory.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">•</span>
                <span className="text-gray-700 text-sm lg:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4 lg:mb-6">
        <InteractiveCodeDisplay
          step={step}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          readonly={showSolution}
          onShowSolution={handleShowSolution}
          onHideSolution={handleHideSolution}
          showingSolution={showSolution}
          onAutoFill={handleAutoFill}
        />
      </div>

      <div className="mb-4 lg:mb-6">
        <h3 className="text-base lg:text-lg font-semibold text-black mb-2 lg:mb-3 flex items-center">
          <svg
            className="w-4 h-4 lg:w-5 lg:h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Подсказки
        </h3>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 lg:p-4">
          <ul className="space-y-2">
            {step.hints.map((hint, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2 font-bold">•</span>
                <span className="text-gray-700 text-sm lg:text-base">
                  {hint}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center justify-center px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors ${
            canGoPrevious
              ? "bg-gray-200 text-black hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Предыдущий шаг</span>
          <span className="sm:hidden">Назад</span>
        </button>

        <button
          onClick={isLastStep ? onComplete : onNext}
          disabled={
            isLastStep ? !allStepsHaveAnswers : !canGoNext || !allAnswersCorrect
          }
          className={`flex items-center justify-center px-4 lg:px-6 py-3 rounded-lg font-medium transition-colors ${
            isLastStep
              ? allStepsHaveAnswers
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              : canGoNext && allAnswersCorrect
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span className="hidden sm:inline">
            {isLastStep ? "Закончить" : "Следующий шаг"}
          </span>
          <span className="sm:hidden">{isLastStep ? "Готово" : "Далее"}</span>
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isLastStep ? "M5 13l4 4L19 7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
