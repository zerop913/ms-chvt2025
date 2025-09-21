export interface DocsSection {
  type: "stepList" | "codeBlock" | "parameterGrid" | "text" | "alert";
  icon: string;
  title: string;
  description: string;
  data?: any;
}

export interface DocsStep {
  title: string;
  description: string;
  sections: DocsSection[];
}

export interface DocsNavigation {
  prev?: {
    href: string;
    title: string;
  };
  next?: {
    href: string;
    title: string;
  };
}

export interface DocsHighlight {
  title: string;
  description: string;
  tags: string[];
}

export interface DocsPageData {
  title: string;
  description: string;
  steps: DocsStep[];
  navigation: DocsNavigation;
  highlight: DocsHighlight;
}
