export interface BlankOption {
  id: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

export interface MasterclassCodeStep {
  title: string;
  description: string;
  codeWithGaps: string;
  completeCode: string;
  blanks: BlankOption[];
  theory: string[];
  hints: string[];
}

export interface UserProgress {
  stepId: number;
  completedBlanks: string[];
  score: number;
  timeSpent: number;
  attempts: number;
  completed: boolean;
}

export interface MasterclassState {
  currentStep: number;
  userProgress: UserProgress[];
  totalScore: number;
  startTime: Date;
}

export interface MasterClassAnimationState {
  isVisible: boolean;
  isLoaded: boolean;
  activeExpert: string | null;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  specialization: string;
}

export interface MasterClassTechnologies {
  primary: string;
  modules: string[];
  benefits: string[];
}

export interface MasterClassContent {
  title: string;
  subtitle: string;
  description: string[];
  technologies: MasterClassTechnologies;
  experts: Expert[];
}

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Task {
  id: string;
  type: "choice" | "input" | "code";
  question: string;
  placeholder?: string;
  hint?: string;
  points: number;
  choices?: Choice[];
  correctAnswer?: string;
  keywords?: string[];
  codeTemplate?: string;
  expectedOutput?: string;
}

export interface MasterClassStep {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  theory: string[];
  hints: string[];
  answers: string[];
  totalPoints?: number;
  bonusTask?: Task;
  codeExample?: {
    title: string;
    code: string;
    description: string;
  };
}
