"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { ChevronRight, Plus } from "lucide-react";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card } from "@/componentes/ui/card";
import type { Conversa } from "@/tipos/crm";

export function PainelDetalhesContato({ conversa }: { conversa?: Conversa }) {
  return (
    <aside className="hidden min-h-0 overflow-y-auto border-l bg-card p-4 xl:block">
      <Tabs.Root defaultValue="detalhes">
        <Tabs.List className="grid grid-cols-2 border-b">
          <Tabs.Trigger value="detalhes" className="border-b-2 border-transparent px-3 py-3 text-sm font-semibold data-[state=active]:border-primary data-[state=active]:text-primary">Detalhes</Tabs.Trigger>
          <Tabs.Trigger value="atividade" className="border-b-2 border-transparent px-3 py-3 text-sm font-semibold data-[state=active]:border-primary data-[state=active]:text-primary">Atividade</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="detalhes" className="mt-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Dados do contato</p>
              <Botao variante="contorno" tamanho="pequeno">Editar</Botao>
            </div>
            <div className="mt-4 space-y-4 text-sm">
              <div><p className="text-muted-foreground">Situação</p><Badge className="mt-1 bg-purple-soft text-purple">{conversa?.situacao ?? "IA_ATIVA"}</Badge></div>
              <div><p className="text-muted-foreground">Etapa no CRM</p><p className="mt-1 font-semibold">Novo lead</p></div>
              <div><p className="text-muted-foreground">Responsável</p><p className="mt-1 font-semibold">Marina Costa</p></div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Etiquetas</p>
              <Botao variante="contorno" tamanho="pequeno"><Plus className="h-4 w-4" />Adicionar</Botao>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {conversa?.etiquetas.map((etiqueta) => <Badge key={etiqueta.id} className="bg-purple-soft text-purple">{etiqueta.nome}</Badge>)}
            </div>
          </Card>
          <Card className="p-4">
            <p className="font-semibold">Tarefas e observações</p>
            <div className="mt-3 rounded-xl border bg-surface-secondary p-3 text-sm">
              <p className="font-medium">Enviar proposta comercial e revisar tags de interesse.</p>
              <p className="mt-2 text-muted-foreground">04/08/2026, 16:00 · Marina Costa</p>
            </div>
          </Card>
          <Card className="flex items-center justify-between p-4">
            <div>
              <p className="font-semibold">Oportunidade</p>
              <p className="mt-2 font-semibold text-primary">R$ 2.400 · Novo lead</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Card>
        </Tabs.Content>
        <Tabs.Content value="atividade" className="mt-4 text-sm text-muted-foreground">
          Histórico visual preparado para atividades, tarefas e mudanças no CRM.
        </Tabs.Content>
      </Tabs.Root>
    </aside>
  );
}
