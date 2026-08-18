import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import { cn } from "@/lib/utils";

export interface ItemConfiguracao {
  rotulo: string;
  valor: string;
  situacao?: "Ativo" | "Ativa" | "Conectado" | "Disponível" | "Inativo";
  icone?: LucideIcon;
}

export function CardDeConfiguracao({
  titulo,
  descricao,
  icone: Icone,
  itens,
  acao,
  tom = "azul",
}: {
  titulo: string;
  descricao: string;
  icone: LucideIcon;
  itens: ItemConfiguracao[];
  acao: string;
  tom?: "azul" | "roxo" | "verde" | "amarelo" | "ciano";
}) {
  const tons = {
    azul: "bg-highlight-soft text-secondary",
    roxo: "bg-purple-soft text-purple",
    verde: "bg-success-soft text-success",
    amarelo: "bg-warning-soft text-warning",
    ciano: "bg-cyan-50 text-cyan-600",
  };

  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <div className={cn("mb-2 flex h-12 w-12 items-center justify-center rounded-2xl", tons[tom])}>
          <Icone className="h-5 w-5" />
        </div>
        <CardTitulo>{titulo}</CardTitulo>
        <CardDescricao>{descricao}</CardDescricao>
      </CardCabecalho>
      <CardConteudo className="space-y-3">
        <div className="space-y-2 rounded-2xl border bg-surface-secondary p-3">
          {itens.map((item) => {
            const ItemIcone = item.icone;
            return (
              <div key={`${item.rotulo}-${item.valor}`} className="flex min-w-0 items-center gap-2 text-sm">
                {ItemIcone ? <ItemIcone className="h-4 w-4 shrink-0 text-muted-foreground" /> : null}
                <span className="min-w-0 flex-1 truncate">{item.valor}</span>
                {item.situacao ? (
                  <Badge className={item.situacao === "Inativo" ? "bg-muted text-muted-foreground" : "bg-success-soft text-success"}>
                    {item.situacao}
                  </Badge>
                ) : null}
              </div>
            );
          })}
        </div>
        <Botao variante="contorno" className="w-full justify-between">
          {acao}
          <ChevronRight className="h-4 w-4" />
        </Botao>
      </CardConteudo>
    </Card>
  );
}
