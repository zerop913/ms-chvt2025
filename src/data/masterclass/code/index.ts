export { step1Code } from "./step1";
export { step2Code } from "./step2";
export { step3Code } from "./step3";
export { step4Code } from "./step4";
export { step5Code } from "./step5";
export { completeAPICode } from "./complete";

export const masterclassSteps = [
  "step1",
  "step2",
  "step3",
  "step4",
  "step5",
  "complete",
] as const;

export type MasterclassStep = (typeof masterclassSteps)[number];
