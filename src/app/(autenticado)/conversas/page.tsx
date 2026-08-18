"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ChatAtivo } from "@/componentes/conversas/chat-ativo";
import { ListaDeConversas } from "@/componentes/conversas/lista-de-conversas";
import { PainelDetalhesContato } from "@/componentes/conversas/painel-detalhes-contato";
import { servicoDeConversas } from "@/servicos/servicos-simulados";
import type { Conversa } from "@/tipos/crm";

export default function PaginaConversas() {
  const { data: conversas = [] } = useQuery({ queryKey: ["conversas"], queryFn: servicoDeConversas.buscarConversas });
  const [idConversaAtiva, setIdConversaAtiva] = useState<string | undefined>();
  const conversaAtiva = useMemo(
    () => conversas.find((conversa) => conversa.id === idConversaAtiva) ?? conversas[0],
    [conversas, idConversaAtiva],
  );

  return (
    <section className="grid h-[calc(100vh-96px)] min-h-[640px] min-w-0 overflow-hidden rounded-2xl border bg-card shadow-[0_12px_34px_rgba(18,62,90,0.06)] lg:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] xl:grid-cols-[minmax(320px,360px)_minmax(0,1fr)_minmax(300px,340px)]">
      <ListaDeConversas conversas={conversas} idAtivo={conversaAtiva?.id} aoSelecionar={(conversa: Conversa) => setIdConversaAtiva(conversa.id)} />
      <ChatAtivo conversa={conversaAtiva} />
      <PainelDetalhesContato conversa={conversaAtiva} />
    </section>
  );
}
