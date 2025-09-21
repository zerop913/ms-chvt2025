import React from "react";

interface DocsStepListProps {
  steps?: Array<{
    text: string;
    highlight?: string;
  }>;
}

export function DocsStepList({ steps }: DocsStepListProps) {
  // Проверяем, что steps существует и является массивом
  if (!steps || !Array.isArray(steps)) {
    return null;
  }

  return (
    <ol className="space-y-3 text-gray-700">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3">
          <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mt-0.5 flex-shrink-0">
            {index + 1}
          </span>
          <span>
            {step.highlight ? (
              <>
                {step.text.split(step.highlight)[0]}
                <span className="font-mono bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
                  {step.highlight}
                </span>
                {step.text.split(step.highlight)[1]}
              </>
            ) : (
              step.text
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
