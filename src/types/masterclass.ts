export interface Expert {
  id: string;
  name: string;
  role: string;
  specialization?: string;
}

export interface MasterClassContent {
  title: string;
  subtitle: string;
  description: string[];
  technologies: {
    primary: string;
    modules: string[];
    benefits: string[];
  };
  experts: Expert[];
}

export interface MasterClassAnimationState {
  isVisible: boolean;
  isLoaded: boolean;
  activeExpert: string | null;
}

// Interactive MasterClass Types
export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Task {
  id: string;
  type: "choice" | "input" | "code";
  question: string;
  choices?: Choice[];
  placeholder?: string;
  correctAnswer?: string;
  hint?: string;
  points: number;
}

export interface CodeExample {
  code: string;
  language: string;
  fileName?: string;
}

export interface MasterClassStep {
  id: number;
  title: string;
  description: string;
  theory: string[];
  tasks: Task[];
  codeExample?: CodeExample;
  hints: string[];
  answers: string[];
  bonusTask?: Task;
}

export interface StepProgress {
  stepId: number;
  score: number;
  completedTasks: string[];
  maxScore: number;
}

export interface UserProgress {
  currentStep: number;
  steps: StepProgress[];
  totalScore: number;
  isCompleted: boolean;
}

export interface InteractiveField {
  id: string;
  type: "dropdown" | "input" | "dragdrop" | "multiplechoice";
  label?: string;
  placeholder?: string;
  options?: string[];
  correctAnswer?: string | string[];
  hint?: string;
}

export interface DragDropItem {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface UserAnswer {
  fieldId: string;
  value: string | number | boolean;
  isCorrect?: boolean;
}
