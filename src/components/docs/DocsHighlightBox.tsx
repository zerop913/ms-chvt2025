import React from "react";
import { LucideIcon } from "lucide-react";

interface DocsHighlightBoxProps {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
}

export function DocsHighlightBox({
  icon: Icon,
  title,
  description,
  tags,
}: DocsHighlightBoxProps) {
  return (
    <div className="mt-12 p-6 border-l-4 border-orange-500 bg-orange-50">
      <div className="flex gap-4">
        <Icon className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-black mb-2">{title}</h3>
          <p className="text-gray-700 mb-3">{description}</p>
          {tags && (
            <div className="flex gap-2 text-sm">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-orange-300 text-orange-700 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
