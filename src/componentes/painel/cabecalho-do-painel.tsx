import { CalendarDays, MoreHorizontal, Plus, SlidersHorizontal } from "lucide-react";
import { Botao } from "@/componentes/ui/botao";

export function CabecalhoDoPainel({
  titulo = "Olá, Marina!",
  descricao = "Aqui está o resumo do atendimento, CRM e consumo da sua empresa.",
}: {
  titulo?: string;
  descricao?: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border bg-card px-4 py-3 shadow-[0_8px_22px_rgba(18,62,90,0.045)] lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-xl font-[700] tracking-normal text-foreground md:text-2xl">{titulo}</h1>
        <p className="mt-0.5 max-w-2xl text-sm leading-snug text-muted-foreground">{descricao}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Botao variante="contorno" tamanho="pequeno">
          <CalendarDays className="h-4 w-4" />
          Agosto 2026
        </Botao>
        <Botao variante="contorno" tamanho="pequeno" className="hidden sm:inline-flex">
          <SlidersHorizontal className="h-4 w-4" />
          Personalizar
        </Botao>
        <Botao tamanho="pequeno">
          <Plus className="h-4 w-4" />
          Nova oportunidade
        </Botao>
        <Botao variante="fantasma" tamanho="icone" aria-label="Mais ações">
          <MoreHorizontal className="h-4 w-4" />
        </Botao>
      </div>
    </div>
  );
}
