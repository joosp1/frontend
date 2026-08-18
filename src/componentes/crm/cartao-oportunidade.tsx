"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CalendarClock, MessageCircle, MoreHorizontal, Phone, UserRound } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card } from "@/componentes/ui/card";
import { formatarMoeda } from "@/lib/utils";
import type { Oportunidade } from "@/tipos/crm";

function iniciais(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export function CartaoOportunidade({
  oportunidade,
  aoAbrir,
}: {
  oportunidade: Oportunidade;
  aoAbrir: (oportunidade: Oportunidade) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: oportunidade.id,
    data: { idEtapa: oportunidade.idEtapa },
  });

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      className={`cursor-grab border-border/80 p-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(18,62,90,0.1)] ${isDragging ? "opacity-70 ring-2 ring-secondary" : ""}`}
      {...listeners}
      {...attributes}
      onClick={() => aoAbrir(oportunidade)}
    >
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarFallback>{iniciais(oportunidade.nomeContato)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{oportunidade.nomeContato}</p>
              <p className="truncate text-xs text-muted-foreground">{oportunidade.nomeEmpresa ?? "Sem empresa"}</p>
            </div>
            <Botao variante="fantasma" tamanho="icone" className="h-7 w-7 rounded-lg" aria-label="Ações da oportunidade">
              <MoreHorizontal className="h-4 w-4" />
            </Botao>
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {oportunidade.etiquetas.map((etiqueta) => (
              <Badge key={etiqueta.id} className="border-blue-100 bg-highlight-soft text-secondary">
                {etiqueta.nome}
              </Badge>
            ))}
          </div>

          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-foreground">{formatarMoeda(oportunidade.valorEstimado)}</span>
            <span className="rounded-full bg-success-soft px-2 py-0.5 text-xs font-medium text-success">WhatsApp</span>
          </div>

          <div className="mt-2 grid gap-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <UserRound className="h-3.5 w-3.5" />
              {oportunidade.nomeResponsavel ?? "Sem responsável"}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {oportunidade.telefone}
            </span>
            {oportunidade.proximaTarefa ? (
              <span className="flex items-center gap-1.5 rounded-lg bg-warning-soft px-2 py-1 text-warning">
                <CalendarClock className="h-3.5 w-3.5" />
                {oportunidade.proximaTarefa.titulo}
              </span>
            ) : null}
            {oportunidade.ultimaInteracaoEm ? (
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5" />
                {formatDistanceToNow(oportunidade.ultimaInteracaoEm, { locale: ptBR, addSuffix: true })}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
