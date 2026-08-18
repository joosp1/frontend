"use client";

import { Filter, Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Input } from "@/componentes/ui/input";
import type { Conversa } from "@/tipos/crm";

function iniciais(nome: string) {
  return nome.split(" ").slice(0, 2).map((parte) => parte[0]).join("");
}

export function ListaDeConversas({
  conversas,
  idAtivo,
  aoSelecionar,
}: {
  conversas: Conversa[];
  idAtivo?: string;
  aoSelecionar: (conversa: Conversa) => void;
}) {
  return (
    <aside className="flex min-h-0 flex-col border-b bg-card lg:border-b-0 xl:border-r">
      <div className="space-y-3 border-b p-4">
        <div className="flex gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar conversa" />
          </div>
          <Botao variante="contorno" tamanho="icone" aria-label="Filtros de conversa">
            <Filter className="h-4 w-4" />
          </Botao>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["Todas", "Não lidas", "Minhas", "Aguardando"].map((filtro, indice) => (
            <Botao key={filtro} variante={indice === 0 ? "primario" : "contorno"} tamanho="pequeno" className="shrink-0">
              {filtro}
              {filtro === "Não lidas" ? <span className="rounded-full bg-muted px-1.5 text-xs">2</span> : null}
            </Botao>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 divide-y overflow-y-auto p-3">
        {conversas.map((conversa) => {
          const ativa = conversa.id === idAtivo;
          return (
            <button
              key={conversa.id}
              onClick={() => aoSelecionar(conversa)}
              className={`w-full rounded-2xl p-3 text-left transition-colors ${ativa ? "bg-highlight-soft ring-1 ring-secondary/25" : "hover:bg-surface-secondary"}`}
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{iniciais(conversa.nomeContato)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="truncate text-sm font-semibold">{conversa.nomeContato}</p>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {conversa.ultimaMensagemEm.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{conversa.ultimaMensagem}</p>
                  <div className="mt-2 flex min-w-0 items-center gap-1.5">
                    <Badge className={conversa.situacao === "HUMANO" ? "bg-warning-soft text-warning" : "bg-purple-soft text-purple"}>
                      {conversa.situacao === "HUMANO" ? "Humano" : conversa.situacao === "AGUARDANDO" ? "Aguardando" : "IA ativa"}
                    </Badge>
                    <Badge className="bg-success-soft text-success">WhatsApp</Badge>
                    {ativa ? <span className="ml-auto rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-white">2</span> : null}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>{conversas.length} conversas</span>
        <Botao variante="contorno" tamanho="pequeno">Mais recentes</Botao>
      </div>
    </aside>
  );
}
