import React from "react";
import {
  Plus,
  Code,
  Database,
  CheckCircle,
  Globe,
  Settings,
  FolderOpen,
  List,
  Tag,
  Play,
  Monitor,
  BookOpen,
  Target,
  FileText,
  ToggleLeft,
  Mic,
  Server,
} from "lucide-react";
import { DocsContentBox, DocsStepList } from "./index";

interface DynamicSectionProps {
  type: string;
  icon: string;
  title: string;
  description?: string;
  data?: unknown;
}

interface ProcessedData {
  steps?: { text: string }[];
  parameters?: { label?: string; name?: string; value?: unknown; description?: string }[];
  content?: string;
  code?: string;
  text?: string;
  items?: string[];
}

const iconMap = {
  Plus,
  Code,
  Database,
  CheckCircle,
  Globe,
  Settings,
  FolderOpen,
  List,
  Tag,
  Play,
  Monitor,
  BookOpen,
  Target,
  FileText,
  ToggleLeft,
  Mic,
  Server,
};

export function DynamicSection({
  type,
  icon,
  title,
  description,
  data,
}: DynamicSectionProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Code;

  // Обработка данных для обратной совместимости
  const processedData: ProcessedData = (() => {
    if (!data) return {} as ProcessedData;

    // Если data - это массив, преобразуем в объект с steps
    if (Array.isArray(data)) {
      return { steps: (data as unknown[]).map((item) => ({ text: String(item) })) };
    }

    return data as ProcessedData;
  })();

  const parameters = Array.isArray(processedData.parameters)
    ? (processedData.parameters as { label?: string; name?: string; value?: unknown; description?: string }[])
    : undefined;

  switch (type) {
    case "stepList":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            {processedData.steps && <DocsStepList steps={processedData.steps} />}
          </DocsContentBox>
        </div>
      );

    case "parameterGrid":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <div className="space-y-3">
              {parameters?.map((p, index) => (
                <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-gray-700">{p.label || p.name}:</span>
                  <span className="font-mono text-orange-600">{String(p.value ?? p.description ?? '')}</span>
                </div>
              ))}
            </div>
          </DocsContentBox>
        </div>
      );

    case "codeBlock":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{processedData.content || processedData.code || ""}</pre>
            </div>
          </DocsContentBox>
        </div>
      );

    case "text":
    case "textBlock":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <div className="text-gray-700">{processedData.content || processedData.text || ""}</div>
          </DocsContentBox>
        </div>
      );

    case "highlightBox":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <ul className="space-y-3">
              {Array.isArray(processedData.items) && processedData.items.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </DocsContentBox>
        </div>
      );

    default:
      return null;
  }
}
