"use client";

import { useDroppable } from "@dnd-kit/core";
import { CircleX, MoreHorizontal, Plus } from "lucide-react";
import { CartaoOportunidade } from "@/componentes/crm/cartao-oportunidade";
import { Botao } from "@/componentes/ui/botao";
import { Card } from "@/componentes/ui/card";
import { formatarMoeda } from "@/lib/utils";
import type { EtapaFunil, Oportunidade } from "@/tipos/crm";

const coresEtapa: Record<string, string> = {
  "novo-lead": "bg-secondary",
  "em-contato": "bg-primary",
  qualificado: "bg-warning",
  "proposta-enviada": "bg-purple",
  convertido: "bg-success",
  perdido: "bg-destructive",
};

export function ColunaFunil({
  etapa,
  oportunidades,
  carregando,
  aoAbrirOportunidade,
}: {
  etapa: EtapaFunil;
  oportunidades: Oportunidade[];
  carregando?: boolean;
  aoAbrirOportunidade: (oportunidade: Oportunidade) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: etapa.id });
  const valorTotal = oportunidades.reduce((total, oportunidade) => total + (oportunidade.valorEstimado ?? 0), 0);

  return (
    <div
      ref={setNodeRef}
      className={`flex h-[calc(100vh-292px)] min-h-[480px] w-[min(312px,calc(100vw-32px))] shrink-0 flex-col rounded-2xl border bg-surface-secondary transition-colors ${
        isOver ? "border-secondary bg-highlight-soft" : ""
      }`}
    >
      <div className="border-b bg-card/85 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${coresEtapa[etapa.id] ?? "bg-secondary"}`} />
              <h2 className="text-sm font-semibold text-foreground">{etapa.nome}</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{oportunidades.length}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{formatarMoeda(valorTotal)} em negociação</p>
          </div>
          <div className="flex">
            <Botao variante="fantasma" tamanho="icone" className="h-8 w-8 rounded-lg" aria-label={`Adicionar em ${etapa.nome}`}>
              <Plus className="h-4 w-4" />
            </Botao>
            <Botao variante="fantasma" tamanho="icone" className="h-8 w-8 rounded-lg" aria-label={`Menu de ${etapa.nome}`}>
              <MoreHorizontal className="h-4 w-4" />
            </Botao>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-3">
        {carregando ? (
          Array.from({ length: 3 }).map((_, indice) => (
            <Card key={indice} className="h-36 animate-pulse bg-card/70" />
          ))
        ) : oportunidades.length > 0 ? (
          oportunidades.map((oportunidade) => (
            <CartaoOportunidade
              key={oportunidade.id}
              oportunidade={oportunidade}
              aoAbrir={aoAbrirOportunidade}
            />
          ))
        ) : (
          <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-2xl border bg-card p-6 text-center text-sm text-muted-foreground">
            <div className="mb-3 rounded-full bg-destructive-soft p-4 text-destructive">
              <CircleX className="h-5 w-5" />
            </div>
            <p className="font-semibold text-foreground">Nenhuma oportunidade {etapa.id === "perdido" ? "perdida" : "nesta etapa"}</p>
            <p className="mt-2 max-w-44 text-xs">Quando uma oportunidade chegar aqui, ela aparecerá neste espaço.</p>
          </div>
        )}
      </div>
      <div className="border-t bg-card/70 p-2">
        <Botao variante="contorno" className="w-full">
          <Plus className="h-4 w-4" />
          Adicionar oportunidade
        </Botao>
      </div>
    </div>
  );
}
