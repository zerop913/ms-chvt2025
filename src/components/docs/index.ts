// Существующие компоненты
export { default as DocsSidebar } from "./DocsSidebar";

// Новые компоненты документации
export { DocsLayout } from "./DocsLayout";
export { DocsPageHeader } from "./DocsPageHeader";
export { DocsStep } from "./DocsStep";
export { DocsContentBox } from "./DocsContentBox";
export { DocsStepList } from "./DocsStepList";
export { DocsHighlightBox } from "./DocsHighlightBox";
export { DocsNavigation } from "./DocsNavigation";
export { DynamicSection } from "./DynamicSection";

// Типы для переиспользования
export interface DocsPageData {
  title: string;
  description: string;
  steps: Array<{
    title: string;
    description: string;
    content: React.ReactNode;
  }>;
  navigation?: {
    prev?: { href: string; title: string };
    next?: { href: string; title: string };
  };
  highlight?: {
    title: string;
    description: string;
    tags?: string[];
  };
}
