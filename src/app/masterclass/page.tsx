"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MasterclassState } from "@/types/masterclass-new";
import {
  MasterclassStep,
  MasterclassProgress,
  MasterclassCompletion,
} from "@/components/masterclass";
import MasterclassService from "@/utils/masterclassService";

export default function MasterClassPage() {
  const router = useRouter();
  const masterclassService = MasterclassService.getInstance();

  const [state, setState] = useState<MasterclassState>(() =>
    masterclassService.initializeProgress()
  );
  const [currentTime, setCurrentTime] = useState("");
  const [prevStep, setPrevStep] = useState(state.currentStep);
  const [isManuallyCompleted, setIsManuallyCompleted] = useState(false);

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

  useEffect(() => {
    if (state.currentStep !== prevStep) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setPrevStep(state.currentStep);
    }
  }, [state.currentStep, prevStep]);

  const handleProgressUpdate = (
    stepIndex: number,
    answers: Record<string, string>
  ) => {
    const newState = masterclassService.updateProgress(
      state,
      stepIndex,
      answers
    );
    setState(newState);
  };

  const handleStepChange = (stepIndex: number) => {
    setState((prev) => {
      if (stepIndex < prev.currentStep) {
        const clearedState = masterclassService.clearSubsequentSteps(
          prev,
          stepIndex
        );
        return { ...clearedState, currentStep: stepIndex };
      }
      return { ...prev, currentStep: stepIndex };
    });
  };

  const handleNext = () => {
    if (state.currentStep < masterclassService.getStepsCount() - 1) {
      setState((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
    }
  };

  const handlePrevious = () => {
    if (state.currentStep > 0) {
      setState((prev) => {
        const newStepIndex = prev.currentStep - 1;
        const clearedState = masterclassService.clearSubsequentSteps(
          prev,
          newStepIndex
        );
        return { ...clearedState, currentStep: newStepIndex };
      });
    }
  };

  const handleRestart = () => {
    const newState = masterclassService.initializeProgress();
    setState(newState);
    setIsManuallyCompleted(false);
  };

  const handleComplete = () => {
    setIsManuallyCompleted(true);
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const currentStep = masterclassService.getStep(state.currentStep);
  const currentProgress = state.userProgress[state.currentStep];
  const allStepsHaveAnswers =
    masterclassService.getOverallProgress(state) === 100;
  const isLastStep =
    state.currentStep === masterclassService.getStepsCount() - 1;

  const canGoNext = state.currentStep < masterclassService.getStepsCount() - 1;
  const canGoPrevious = state.currentStep > 0;

  if (isManuallyCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        <MasterclassCompletion
          state={state}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
        />
      </div>
    );
  }

  if (!currentStep) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
            Ошибка загрузки шага
          </h1>
          <button
            onClick={handleGoHome}
            className="w-full lg:w-auto px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <MasterclassProgress
        state={state}
        currentStep={state.currentStep}
        onStepChange={handleStepChange}
      />

      <div className="pb-4 lg:pb-8">
        <MasterclassStep
          step={currentStep}
          stepIndex={state.currentStep}
          progress={currentProgress}
          onProgressUpdate={handleProgressUpdate}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onComplete={handleComplete}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
          isLastStep={isLastStep}
          allStepsHaveAnswers={allStepsHaveAnswers}
        />
      </div>
    </div>
  );
}
