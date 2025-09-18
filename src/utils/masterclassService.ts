import {
  MasterclassCodeStep,
  UserProgress,
  MasterclassState,
} from "@/types/masterclass-new";
import {
  step1Code,
  step2Code,
  step3Code,
  step4Code,
  step5Code,
  completeAPICode,
} from "@/data/masterclass/code";

class MasterclassService {
  private static instance: MasterclassService;
  private steps: MasterclassCodeStep[];

  private constructor() {
    this.steps = [step1Code, step2Code, step3Code, step4Code, step5Code];
  }

  public static getInstance(): MasterclassService {
    if (!MasterclassService.instance) {
      MasterclassService.instance = new MasterclassService();
    }
    return MasterclassService.instance;
  }

  public getAllSteps(): MasterclassCodeStep[] {
    return this.steps;
  }

  public getStep(stepIndex: number): MasterclassCodeStep | null {
    if (stepIndex < 0 || stepIndex >= this.steps.length) {
      return null;
    }
    return this.steps[stepIndex];
  }

  public getCompleteCode() {
    return completeAPICode;
  }

  public getStepsCount(): number {
    return this.steps.length;
  }

  public validateAnswer(
    stepIndex: number,
    blankId: string,
    answer: string
  ): boolean {
    const step = this.getStep(stepIndex);
    if (!step) return false;

    const blank = step.blanks.find((b) => b.id === blankId);
    if (!blank) return false;

    return blank.correctAnswer === answer;
  }

  public calculateStepScore(
    stepIndex: number,
    answers: Record<string, string>
  ): number {
    const step = this.getStep(stepIndex);
    if (!step) return 0;

    const totalBlanks = step.blanks.length;
    const correctAnswers = step.blanks.filter(
      (blank) => answers[blank.id] === blank.correctAnswer
    ).length;

    return Math.round((correctAnswers / totalBlanks) * 100);
  }

  public getHint(stepIndex: number, blankId: string): string | null {
    const step = this.getStep(stepIndex);
    if (!step) return null;

    const blank = step.blanks.find((b) => b.id === blankId);
    return blank?.hint || null;
  }

  public initializeProgress(): MasterclassState {
    const userProgress: UserProgress[] = this.steps.map((_, index) => ({
      stepId: index,
      completedBlanks: [],
      score: 0,
      timeSpent: 0,
      attempts: 0,
      completed: false,
    }));

    return {
      currentStep: 0,
      userProgress,
      totalScore: 0,
      startTime: new Date(),
    };
  }

  public updateProgress(
    state: MasterclassState,
    stepIndex: number,
    answers: Record<string, string>
  ): MasterclassState {
    const newState = { ...state };
    const stepProgress = { ...newState.userProgress[stepIndex] };

    stepProgress.attempts += 1;
    stepProgress.score = this.calculateStepScore(stepIndex, answers);
    stepProgress.completedBlanks = Object.keys(answers);
    stepProgress.completed = stepProgress.score === 100;

    newState.userProgress[stepIndex] = stepProgress;
    newState.totalScore = newState.userProgress.reduce(
      (sum, p) => sum + p.score,
      0
    );

    return newState;
  }

  public isStepCompleted(state: MasterclassState, stepIndex: number): boolean {
    return state.userProgress[stepIndex]?.completed || false;
  }

  public canAdvanceToNextStep(
    state: MasterclassState,
    stepIndex: number
  ): boolean {
    return this.isStepCompleted(state, stepIndex);
  }

  public getOverallProgress(state: MasterclassState): number {
    const completedSteps = state.userProgress.filter((p) => p.completed).length;
    return Math.round((completedSteps / this.steps.length) * 100);
  }

  public getFormattedCode(
    stepIndex: number,
    answers: Record<string, string>
  ): string {
    const step = this.getStep(stepIndex);
    if (!step) return "";

    let code = step.codeWithGaps;

    // Заменяем пропуски на ответы пользователя или на placeholder
    step.blanks.forEach((blank) => {
      const userAnswer = answers[blank.id];
      const replacement = userAnswer || `[${blank.id}]`;
      code = code.replace(new RegExp(`___${blank.id}___`, "g"), replacement);
    });

    return code;
  }

  public exportProgress(state: MasterclassState): string {
    return JSON.stringify(state, null, 2);
  }

  public clearSubsequentSteps(
    state: MasterclassState,
    fromStep: number
  ): MasterclassState {
    const newState = { ...state };
    newState.userProgress = [...state.userProgress];

    // Сбрасываем состояния всех шагов после указанного
    for (let i = fromStep + 1; i < newState.userProgress.length; i++) {
      newState.userProgress[i] = {
        stepId: i,
        completedBlanks: [],
        score: 0,
        timeSpent: 0,
        attempts: 0,
        completed: false,
      };
    }

    // Пересчитываем общий счет
    newState.totalScore = newState.userProgress.reduce(
      (sum, p) => sum + p.score,
      0
    );

    return newState;
  }

  public importProgress(progressJson: string): MasterclassState | null {
    try {
      const state = JSON.parse(progressJson);
      // Валидация структуры состояния
      if (state && state.userProgress && Array.isArray(state.userProgress)) {
        return state;
      }
      return null;
    } catch {
      return null;
    }
  }
}

export default MasterclassService;
