"use client";

import { useQuery } from "@tanstack/react-query";
import { Bot, MessageCircle, Timer, TrendingUp, Users, WalletCards } from "lucide-react";
import { CartaoMetrica } from "@/componentes/painel/cartao-metrica";
import {
  GraficoDeConversas,
  GraficoDeOportunidades,
} from "@/componentes/painel/graficos-dashboard";
import { SecaoOperacional } from "@/componentes/painel/secao-operacional";
import { formatarMoeda, formatarPercentual } from "@/lib/utils";
import { servicoDePainel } from "@/servicos/servicos-simulados";

export default function PaginaPainel() {
  const { data } = useQuery({ queryKey: ["painel", "resumo"], queryFn: servicoDePainel.buscarResumo });

  return (
    <div className="space-y-3">
      <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        <CartaoMetrica titulo="Conversas hoje" valor={String(data?.conversasHoje ?? 0)} comparacao="+12% vs ontem" auxiliar="WhatsApp e IA" icone={MessageCircle} />
        <CartaoMetrica titulo="Novos contatos" valor={String(data?.novosContatos ?? 0)} comparacao="+24% vs semana passada" auxiliar="Entradas qualificadas" icone={Users} />
        <CartaoMetrica titulo="Valor em negociação" valor={formatarMoeda(data?.valorEmNegociacao)} comparacao="+18% no mês" auxiliar="Pipeline comercial" icone={WalletCards} tom="financeiro" />
        <CartaoMetrica titulo="Tarefas atrasadas" valor={String(data?.tarefasAtrasadas ?? 0)} comparacao="-25% de pendências" auxiliar="Requer ação hoje" icone={Timer} tom="alerta" />
      </section>

      <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
        <CartaoMetrica titulo="Oportunidades ganhas" valor={String(data?.oportunidadesGanhas ?? 0)} comparacao="+4 vs mês anterior" auxiliar="Novas conversões" icone={TrendingUp} tom="financeiro" compacto />
        <CartaoMetrica titulo="Consumo de IA" valor={formatarPercentual(data?.consumoIa)} comparacao="62% do limite mensal" auxiliar="Uso controlado" icone={Bot} tom="ia" compacto />
        <CartaoMetrica titulo="Taxa de resposta da IA" valor={formatarPercentual(data?.taxaRespostaIa)} comparacao="+6 p.p. no período" auxiliar="Sem intervenção humana" icone={Bot} tom="ia" compacto />
        <CartaoMetrica titulo="Transferências para humano" valor={String(data?.transferenciasHumano ?? 0)} comparacao="-8% vs semana passada" auxiliar="Atendimentos assumidos" icone={Users} compacto />
      </section>

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <GraficoDeOportunidades dados={data?.oportunidadesPorEtapa ?? []} />
        <GraficoDeConversas dados={data?.conversasPorDia ?? []} />
      </section>

      <SecaoOperacional />
    </div>
  );
}
