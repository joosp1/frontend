import { Bell, CircleHelp, MoreHorizontal, Plus } from "lucide-react";
import { Botao } from "@/componentes/ui/botao";

export function AcoesDaTopbar() {
  return (
    <div className="flex shrink-0 items-center gap-1.5">
      <Botao className="hidden xl:inline-flex" tamanho="pequeno">
        <Plus className="h-4 w-4" />
        Nova oportunidade
      </Botao>
      <Botao variante="fantasma" tamanho="icone" aria-label="Notificações">
        <Bell className="h-4 w-4" />
      </Botao>
      <Botao variante="fantasma" tamanho="icone" className="hidden lg:inline-flex" aria-label="Ajuda">
        <CircleHelp className="h-4 w-4" />
      </Botao>
      <Botao variante="fantasma" tamanho="icone" className="lg:hidden" aria-label="Mais ações">
        <MoreHorizontal className="h-4 w-4" />
      </Botao>
    </div>
  );
}
