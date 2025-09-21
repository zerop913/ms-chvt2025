import React from "react";
import { LucideIcon } from "lucide-react";

interface DocsStepProps {
  stepNumber: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DocsStep({
  stepNumber,
  title,
  description,
  children,
}: DocsStepProps) {
  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {stepNumber}
          </div>
          <h2 className="text-2xl font-bold text-black">{title}</h2>
        </div>
        <p className="text-gray-600 ml-11">{description}</p>
      </div>

      <div className="ml-11 space-y-6">{children}</div>
    </section>
  );
}
