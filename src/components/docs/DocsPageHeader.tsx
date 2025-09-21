import React from "react";
import { LucideIcon } from "lucide-react";

interface DocsPageHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function DocsPageHeader({
  icon: Icon,
  title,
  description,
}: DocsPageHeaderProps) {
  return (
    <header className="mb-16">
      <div className="flex items-center gap-4 mb-4">
        <Icon className="h-8 w-8 text-orange-500" />
        <h1 className="text-3xl font-bold text-black">{title}</h1>
      </div>
      <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
    </header>
  );
}
