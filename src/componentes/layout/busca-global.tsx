"use client";

import { Search } from "lucide-react";
import { Botao } from "@/componentes/ui/botao";
import { Input } from "@/componentes/ui/input";
import { cn } from "@/lib/utils";

export function BuscaGlobal({ className }: { className?: string }) {
  return (
    <>
      <div className={cn("relative hidden min-w-0 flex-1 md:block", className)}>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          className="h-11 min-w-0 truncate pl-9 pr-14"
          placeholder="Buscar contatos, conversas e oportunidades"
          aria-label="Buscar contatos, conversas e oportunidades"
        />
        <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-lg border bg-surface-secondary px-2 py-1 text-[11px] text-muted-foreground 2xl:block">
          ⌘ K
        </span>
      </div>
      <Botao variante="fantasma" tamanho="icone" className="md:hidden" aria-label="Abrir busca">
        <Search className="h-4 w-4" />
      </Botao>
    </>
  );
}
