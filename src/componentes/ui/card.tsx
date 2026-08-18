import type * as React from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card text-card-foreground shadow-[0_10px_30px_rgba(18,62,90,0.06)] transition-shadow",
        className,
      )}
      {...props}
    />
  ),
);

Card.displayName = "Card";

export function CardCabecalho({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1 p-4 pb-3", className)} {...props} />;
}

export function CardTitulo({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-base font-[650] text-foreground", className)} {...props} />;
}

export function CardDescricao({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-snug text-muted-foreground", className)} {...props} />;
}

export function CardConteudo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-0", className)} {...props} />;
}
