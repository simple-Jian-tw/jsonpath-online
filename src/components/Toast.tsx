"use client";

import { useEffect } from "react";
import { cn } from "@/lib/cn";

export type ToastProps = {
  message: string | null;
  kind?: "info" | "error";
  durationMs?: number;
  onClear: () => void;
};

export function Toast({
  message,
  kind = "info",
  durationMs = 2400,
  onClear,
}: ToastProps) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClear, durationMs);
    return () => clearTimeout(t);
  }, [message, durationMs, onClear]);

  if (!message) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div
        className={cn(
          "pointer-events-auto max-w-xl rounded-xl border px-4 py-3 text-sm shadow-lg backdrop-blur",
          kind === "error"
            ? "border-red-500/30 bg-red-500/10 text-red-100"
            : "border-black/10 bg-black/70 text-white dark:border-white/10 dark:bg-white/10 dark:text-white",
        )}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </div>
  );
}

