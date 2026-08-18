"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Bot, Gauge, MessageSquare, Wallet } from "lucide-react";
import { CartaoMetrica } from "@/componentes/painel/cartao-metrica";
import { GraficoDeConsumoIa } from "@/componentes/painel/graficos-dashboard";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import * as Progress from "@radix-ui/react-progress";
import { formatarMoeda, formatarPercentual } from "@/lib/utils";
import { consumoPorDiaSimulado } from "@/dados-simulados/crm";
import { servicoDeConsumo } from "@/servicos/servicos-simulados";

export default function PaginaConsumo() {
  const { data } = useQuery({ queryKey: ["consumo"], queryFn: servicoDeConsumo.buscarConsumo });

  return (
    <div className="space-y-3">
      <Card>
        <CardCabecalho>
          <CardTitulo>{data?.plano ?? "Plano"} · {data?.periodo}</CardTitulo>
          <CardDescricao>{formatarPercentual(data?.percentualUtilizado)} do limite mensal utilizado</CardDescricao>
        </CardCabecalho>
        <CardConteudo>
          <Progress.Root className="h-3 overflow-hidden rounded-full bg-muted" value={(data?.percentualUtilizado ?? 0) * 100}>
            <Progress.Indicator className="h-full w-[62%] rounded-full bg-purple transition-transform" />
          </Progress.Root>
          <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] text-muted-foreground">
            {["70%", "85%", "95%", "100%"].map((marcador) => (
              <span key={marcador} className="rounded-lg bg-purple-soft px-2 py-1 text-center text-purple">{marcador}</span>
            ))}
          </div>
        </CardConteudo>
      </Card>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <CartaoMetrica titulo="Tokens de entrada" valor={(data?.tokensEntrada ?? 0).toLocaleString("pt-BR")} comparacao="+11% vs semana" auxiliar="Prompt e contexto" icone={Bot} tom="ia" compacto />
        <CartaoMetrica titulo="Tokens de saída" valor={(data?.tokensSaida ?? 0).toLocaleString("pt-BR")} comparacao="+8% vs semana" auxiliar="Respostas geradas" icone={Bot} tom="ia" compacto />
        <CartaoMetrica titulo="Chamadas de IA" valor={(data?.chamadasIa ?? 0).toLocaleString("pt-BR")} comparacao="Estável" auxiliar="Requisições processadas" icone={Gauge} compacto />
        <CartaoMetrica titulo="Mensagens" valor={(data?.mensagensProcessadas ?? 0).toLocaleString("pt-BR")} comparacao="+14% no período" auxiliar="Mensagens processadas" icone={MessageSquare} compacto />
        <CartaoMetrica titulo="Custo estimado" valor={formatarMoeda(data?.custoEstimado)} comparacao="Dentro do previsto" auxiliar="No período atual" icone={Wallet} tom="financeiro" compacto />
        <CartaoMetrica titulo="Custo por conversa" valor={formatarMoeda(data?.custoPorConversa)} comparacao="-6% vs mês" auxiliar="Média simulada" icone={Wallet} tom="financeiro" compacto />
        <CartaoMetrica titulo="Limite mensal" valor={(data?.limite ?? 0).toLocaleString("pt-BR")} comparacao="62% utilizado" auxiliar="Tokens contratados" icone={Gauge} tom="ia" compacto />
        <CartaoMetrica titulo="Alertas de limite" valor="2" comparacao="70% e 85%" auxiliar="Regras configuradas" icone={AlertTriangle} tom="alerta" compacto />
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <GraficoDeConsumoIa dados={consumoPorDiaSimulado} />
        </div>
        <Card>
          <CardCabecalho>
            <CardTitulo>Custo por funcionalidade</CardTitulo>
            <CardDescricao>Atendimento, CRM, resumos e busca</CardDescricao>
          </CardCabecalho>
          <CardConteudo className="space-y-3">
            {[
              ["Atendimento", "R$ 620", "50%"],
              ["CRM", "R$ 310", "25%"],
              ["Resumos", "R$ 210", "17%"],
              ["Busca", "R$ 100", "8%"],
            ].map(([nome, valor, percentual]) => (
              <div key={nome} className="rounded-xl border bg-surface-secondary p-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{nome}</span>
                  <span className="text-muted-foreground">{valor}</span>
                </div>
                <p className="mt-1 text-xs text-soft-foreground">{percentual} do custo estimado</p>
              </div>
            ))}
          </CardConteudo>
        </Card>
      </section>
    </div>
  );
}
