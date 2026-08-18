"use client";

import { useQuery } from "@tanstack/react-query";
import { FiltrosDeRelatorio } from "@/componentes/relatorios/filtros-de-relatorio";
import { GraficoConsumoIaCategoria } from "@/componentes/relatorios/grafico-consumo-ia-categoria";
import { GraficoEvolucaoConversas } from "@/componentes/relatorios/grafico-evolucao-conversas";
import { GraficoFunilOportunidades } from "@/componentes/relatorios/grafico-funil-oportunidades";
import { GraficoTempoResposta } from "@/componentes/relatorios/grafico-tempo-resposta";
import { ListaRelatoriosAgendados } from "@/componentes/relatorios/lista-relatorios-agendados";
import { ResumoDeRelatorios } from "@/componentes/relatorios/resumo-de-relatorios";
import { TabelaTopAtendentes } from "@/componentes/relatorios/tabela-top-atendentes";
import { servicoDeRelatorios } from "@/servicos/servicos-simulados";

export default function PaginaRelatorios() {
  const { data } = useQuery({
    queryKey: ["relatorios"],
    queryFn: servicoDeRelatorios.buscarRelatorios,
  });

  return (
    <div className="space-y-3">
      <FiltrosDeRelatorio />
      <ResumoDeRelatorios metricas={data?.metricas} />

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        <GraficoEvolucaoConversas dados={data?.evolucaoConversas ?? []} />
        <GraficoFunilOportunidades dados={data?.funilOportunidades ?? []} />
        <GraficoConsumoIaCategoria dados={data?.consumoIaCategoria ?? []} />
        <GraficoTempoResposta dados={data?.tempoResposta ?? []} />
      </section>

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-[1.2fr_0.8fr]">
        <TabelaTopAtendentes atendentes={data?.topAtendentes ?? []} />
        <ListaRelatoriosAgendados relatorios={data?.relatoriosAgendados ?? []} />
      </section>
    </div>
  );
}
