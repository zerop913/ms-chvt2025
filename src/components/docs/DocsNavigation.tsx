import React from "react";
import { ArrowRight } from "lucide-react";

interface DocsNavigationProps {
  prevPage?: {
    href: string;
    title: string;
  };
  nextPage?: {
    href: string;
    title: string;
  };
}

export function DocsNavigation({ prevPage, nextPage }: DocsNavigationProps) {
  return (
    <div className="flex justify-between items-center pt-12 mt-12 border-t border-gray-200">
      {prevPage ? (
        <a
          href={prevPage.href}
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <span className="mr-2">←</span>
          {prevPage.title}
        </a>
      ) : (
        <div />
      )}

      {nextPage && (
        <a
          href={nextPage.href}
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white hover:bg-orange-600 transition-colors rounded-lg"
        >
          {nextPage.title}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      )}
    </div>
  );
}
