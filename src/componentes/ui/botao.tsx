import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const variantesBotao = cva(
  "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variante: {
        primario: "bg-primary text-primary-foreground shadow-sm hover:bg-primary-dark",
        secundario: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        contorno: "border bg-card text-foreground shadow-sm hover:bg-surface-secondary",
        fantasma: "text-muted-foreground hover:bg-muted hover:text-foreground",
        perigo: "bg-destructive text-white hover:bg-red-700",
      },
      tamanho: {
        padrao: "h-10 px-4",
        pequeno: "h-8 px-3 text-xs",
        icone: "h-9 w-9 px-0",
      },
    },
    defaultVariants: {
      variante: "primario",
      tamanho: "padrao",
    },
  },
);

export interface BotaoProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variantesBotao> {
  comoFilho?: boolean;
}

export function Botao({ className, variante, tamanho, comoFilho = false, ...props }: BotaoProps) {
  const Comp = comoFilho ? Slot : "button";

  return <Comp className={cn(variantesBotao({ variante, tamanho, className }))} {...props} />;
}
