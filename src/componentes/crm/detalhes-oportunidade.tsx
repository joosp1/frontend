"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { CheckCircle2, MessageCircle, StickyNote, UserCheck, XCircle } from "lucide-react";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Drawer } from "@/componentes/ui/drawer";
import { formatarMoeda } from "@/lib/utils";
import type { EtapaFunil, Oportunidade } from "@/tipos/crm";

export function DetalhesOportunidade({
  oportunidade,
  etapas,
  aberto,
  aoAlterarAberto,
}: {
  oportunidade?: Oportunidade;
  etapas: EtapaFunil[];
  aberto: boolean;
  aoAlterarAberto: (aberto: boolean) => void;
}) {
  const etapaAtual = etapas.find((etapa) => etapa.id === oportunidade?.idEtapa);

  return (
    <Drawer aberto={aberto} aoAlterarAberto={aoAlterarAberto} titulo={oportunidade?.nomeContato ?? "Oportunidade"}>
      {oportunidade ? (
        <div className="space-y-5">
          <div>
            <p className="text-sm text-muted-foreground">{oportunidade.nomeEmpresa}</p>
            <h2 className="mt-1 text-2xl font-semibold">{oportunidade.nomeContato}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {oportunidade.etiquetas.map((etiqueta) => (
                <Badge key={etiqueta.id} style={{ borderColor: `${etiqueta.cor}35`, color: etiqueta.cor }}>
                  {etiqueta.nome}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Etapa atual</p>
              <p className="mt-1 text-sm font-semibold">{etapaAtual?.nome ?? "Sem etapa"}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Valor</p>
              <p className="mt-1 text-sm font-semibold">{formatarMoeda(oportunidade.valorEstimado)}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Responsável</p>
              <p className="mt-1 text-sm font-semibold">{oportunidade.nomeResponsavel}</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">Origem</p>
              <p className="mt-1 text-sm font-semibold">{oportunidade.origem}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Botao variante="contorno">
              <UserCheck className="h-4 w-4" />
              Assumir
            </Botao>
            <Botao variante="contorno">
              <MessageCircle className="h-4 w-4" />
              Conversa
            </Botao>
            <Botao variante="contorno">
              <StickyNote className="h-4 w-4" />
              Anotação
            </Botao>
            <Botao variante="contorno">
              <CheckCircle2 className="h-4 w-4" />
              Converter
            </Botao>
            <Botao variante="perigo" className="col-span-2">
              <XCircle className="h-4 w-4" />
              Marcar como perdida
            </Botao>
          </div>

          <Tabs.Root defaultValue="resumo" className="space-y-4">
            <Tabs.List className="flex gap-1 rounded-lg bg-muted p-1">
              {["Resumo", "Atividades", "Conversas", "Tarefas", "Anotações"].map((aba) => (
                <Tabs.Trigger
                  key={aba}
                  value={aba.toLowerCase()}
                  className="flex-1 rounded-md px-2 py-2 text-xs font-medium text-muted-foreground data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {aba}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            <Tabs.Content value="resumo" className="space-y-3 text-sm text-muted-foreground">
              <p>Contato interessado em automatizar atendimento, qualificação e retorno pelo WhatsApp.</p>
              <div className="rounded-lg border p-3">
                <p className="font-medium text-foreground">Próxima tarefa</p>
                <p className="mt-1">{oportunidade.proximaTarefa?.titulo ?? "Nenhuma tarefa aberta"}</p>
              </div>
            </Tabs.Content>
            <Tabs.Content value="atividades" className="space-y-3 text-sm">
              <p className="rounded-lg border p-3 text-muted-foreground">Etapa atualizada e conversa registrada no histórico.</p>
            </Tabs.Content>
            <Tabs.Content value="conversas" className="space-y-3 text-sm">
              <p className="rounded-lg border p-3 text-muted-foreground">Última conversa vinculada ao WhatsApp preparada para integração real.</p>
            </Tabs.Content>
            <Tabs.Content value="tarefas" className="space-y-3 text-sm">
              <p className="rounded-lg border p-3 text-muted-foreground">Criação e edição de tarefas serão conectadas ao serviço real depois.</p>
            </Tabs.Content>
            <Tabs.Content value="anotações" className="space-y-3 text-sm">
              <p className="rounded-lg border p-3 text-muted-foreground">Nenhuma anotação registrada.</p>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      ) : null}
    </Drawer>
  );
}
