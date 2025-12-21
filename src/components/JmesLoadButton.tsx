"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function JmesLoadButton({
  json,
  expression,
  children,
  className,
  scrollToTop,
}: {
  json: string;
  expression: string;
  children: ReactNode;
  className?: string;
  scrollToTop?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("jmespath:load-example", {
            detail: { json, expression },
          }),
        );
        if (scrollToTop) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={cn(className)}
    >
      {children}
    </button>
  );
}
