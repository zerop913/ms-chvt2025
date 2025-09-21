import React from "react";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="w-full px-[100px] py-20">
        <article className="max-w-none">{children}</article>
      </div>
    </div>
  );
}
