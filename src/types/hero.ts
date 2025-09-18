export interface HeroContent {
  title: {
    main: string;
    highlight: string;
    suffix: string;
  };
  subtitle: string;
  description: string[];
  competency: {
    label: string;
    event: string;
    year: string;
  };
}

export interface FloatingElement {
  id: string;
  size: "sm" | "md" | "lg";
  position: {
    top: string;
    left: string;
  };
  animation: {
    duration: string;
    delay: string;
  };
  shape: "circle" | "square" | "triangle" | "hexagon";
}

export interface AnimationState {
  isVisible: boolean;
  isLoaded: boolean;
  activeElement: string | null;
}
