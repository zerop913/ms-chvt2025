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
  data?: any;
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
  const processedData = (() => {
    if (!data) return {};

    // Если data - это массив, преобразуем в объект с steps
    if (Array.isArray(data)) {
      return { steps: data.map((item: string) => ({ text: item })) };
    }

    return data;
  })();

  switch (type) {
    case "stepList":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            {processedData?.steps && (
              <DocsStepList steps={processedData.steps} />
            )}
          </DocsContentBox>
        </div>
      );

    case "parameterGrid":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <div className="space-y-3">
              {(processedData?.parameters || processedData)?.map &&
                (processedData?.parameters || processedData)?.map(
                  (param: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between p-2 bg-gray-50 rounded"
                    >
                      <span className="text-gray-700">
                        {param.label || param.name}:
                      </span>
                      <span className="font-mono text-orange-600">
                        {param.value || param.description}
                      </span>
                    </div>
                  )
                )}
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
              <pre>{data?.content || data?.code || ""}</pre>
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
            <div className="text-gray-700">
              {data?.content || data?.text || ""}
            </div>
          </DocsContentBox>
        </div>
      );

    case "highlightBox":
      return (
        <div className="mb-6">
          <DocsContentBox icon={IconComponent} title={title}>
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            <ul className="space-y-3">
              {data?.items?.map((item: string, index: number) => (
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
