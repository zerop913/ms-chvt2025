import React from "react";
import { LucideIcon } from "lucide-react";

interface DocsContentBoxProps {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  variant?: "default" | "info" | "warning" | "success";
}

export function DocsContentBox({
  icon: Icon,
  title,
  children,
  variant = "default",
}: DocsContentBoxProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "info":
        return "border-l-4 border-orange-500 bg-orange-50";
      case "warning":
        return "border-l-4 border-yellow-500 bg-yellow-50";
      case "success":
        return "border-l-4 border-green-500 bg-green-50";
      default:
        return "border border-gray-200 rounded-lg";
    }
  };

  return (
    <div className={`p-6 ${getVariantStyles()}`}>
      <div className="flex items-center gap-3 mb-4">
        <Icon className="h-5 w-5 text-orange-500" />
        <h3 className="text-lg font-semibold text-black">{title}</h3>
      </div>
      {children}
    </div>
  );
}
