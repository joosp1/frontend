import type * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border bg-card px-3 text-sm text-foreground outline-none transition-colors placeholder:text-soft-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/15",
        className,
      )}
      {...props}
    />
  );
}
