"use client";

import { DndContext, type DragEndEvent, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Filter, Plus, Search, Target, Timer, Trophy, TrendingUp, WalletCards } from "lucide-react";
import { useMemo, useState } from "react";
import { ColunaFunil } from "@/componentes/crm/coluna-funil";
import { DetalhesOportunidade } from "@/componentes/crm/detalhes-oportunidade";
import { CartaoMetrica } from "@/componentes/painel/cartao-metrica";
import { Botao } from "@/componentes/ui/botao";
import { Input } from "@/componentes/ui/input";
import { formatarMoeda, formatarPercentual } from "@/lib/utils";
import { servicoDeOportunidades } from "@/servicos/servico-de-oportunidades";
import type { Oportunidade } from "@/tipos/crm";

export function PainelCrm() {
  const clienteConsulta = useQueryClient();
  const [busca, setBusca] = useState("");
  const [oportunidadeAberta, setOportunidadeAberta] = useState<Oportunidade | undefined>();
  const sensores = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const { data: etapas = [] } = useQuery({
    queryKey: ["crm", "etapas"],
    queryFn: servicoDeOportunidades.buscarEtapas,
  });

  const { data: oportunidades = [], isLoading } = useQuery({
    queryKey: ["crm", "oportunidades"],
    queryFn: servicoDeOportunidades.buscarOportunidades,
  });

  const { data: indicadores } = useQuery({
    queryKey: ["crm", "indicadores"],
    queryFn: servicoDeOportunidades.buscarIndicadores,
  });

  const oportunidadesFiltradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    if (!termo) {
      return oportunidades;
    }

    return oportunidades.filter((oportunidade) =>
      [oportunidade.nomeContato, oportunidade.nomeEmpresa, oportunidade.telefone, oportunidade.origem]
        .filter(Boolean)
        .some((valor) => valor?.toLowerCase().includes(termo)),
    );
  }, [busca, oportunidades]);

  const mutacaoMover = useMutation({
    mutationFn: ({ idOportunidade, idEtapaDestino }: { idOportunidade: string; idEtapaDestino: string }) =>
      servicoDeOportunidades.moverOportunidade(idOportunidade, idEtapaDestino),
    onMutate: async ({ idOportunidade, idEtapaDestino }) => {
      await clienteConsulta.cancelQueries({ queryKey: ["crm", "oportunidades"] });
      const anteriores = clienteConsulta.getQueryData<Oportunidade[]>(["crm", "oportunidades"]);
      clienteConsulta.setQueryData<Oportunidade[]>(["crm", "oportunidades"], (atuais = []) =>
        atuais.map((oportunidade) =>
          oportunidade.id === idOportunidade
            ? {
                ...oportunidade,
                idEtapa: idEtapaDestino,
                situacao:
                  idEtapaDestino === "convertido" ? "GANHA" : idEtapaDestino === "perdido" ? "PERDIDA" : "ABERTA",
              }
            : oportunidade,
        ),
      );
      return { anteriores };
    },
    onError: (_erro, _variaveis, contexto) => {
      clienteConsulta.setQueryData(["crm", "oportunidades"], contexto?.anteriores);
    },
    onSettled: () => {
      clienteConsulta.invalidateQueries({ queryKey: ["crm", "indicadores"] });
      clienteConsulta.invalidateQueries({ queryKey: ["crm", "oportunidades"] });
    },
  });

  function aoFinalizarArraste(evento: DragEndEvent) {
    const idOportunidade = String(evento.active.id);
    const idEtapaDestino = evento.over?.id ? String(evento.over.id) : undefined;
    const oportunidade = oportunidades.find((item) => item.id === idOportunidade);

    if (!idEtapaDestino || !oportunidade || oportunidade.idEtapa === idEtapaDestino) {
      return;
    }

    mutacaoMover.mutate({ idOportunidade, idEtapaDestino });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-[0_8px_22px_rgba(18,62,90,0.045)] xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {["Funil de vendas", "Quantidade", "Valor"].map((item, indice) => (
            <Botao key={item} variante={indice === 0 ? "primario" : "contorno"} tamanho="pequeno">
              {item}
            </Botao>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative min-w-0 sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={busca}
              onChange={(evento) => setBusca(evento.target.value)}
              className="pl-9"
              placeholder="Buscar oportunidade"
            />
          </div>
          <Botao variante="contorno">
            <Filter className="h-4 w-4" />
            Filtros
          </Botao>
          <Botao>
            <Plus className="h-4 w-4" />
            Nova oportunidade
          </Botao>
        </div>
      </div>

      <section className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-5">
        <CartaoMetrica
          titulo="Oportunidades abertas"
          valor={String(indicadores?.oportunidadesAbertas ?? 0)}
          comparacao="+12% vs semana passada"
          auxiliar="No funil ativo"
          icone={Target}
          compacto
        />
        <CartaoMetrica
          titulo="Valor em negociação"
          valor={formatarMoeda(indicadores?.valorTotalNegociacao)}
          comparacao="+18% no mês"
          auxiliar="Pipeline estimado"
          icone={WalletCards}
          tom="financeiro"
          compacto
        />
        <CartaoMetrica
          titulo="Oportunidades ganhas"
          valor={String(indicadores?.oportunidadesGanhas ?? 0)}
          comparacao="+4 novas"
          auxiliar="No período atual"
          icone={Trophy}
          tom="financeiro"
          compacto
        />
        <CartaoMetrica
          titulo="Taxa de conversão"
          valor={formatarPercentual(indicadores?.taxaConversao)}
          comparacao="+4 p.p."
          auxiliar="Média do mês"
          icone={TrendingUp}
          tom="ia"
          compacto
        />
        <CartaoMetrica
          titulo="Tarefas atrasadas"
          valor={String(indicadores?.tarefasAtrasadas ?? 0)}
          comparacao="-25% pendências"
          auxiliar="Precisam de atenção"
          icone={Timer}
          tom="alerta"
          compacto
        />
      </section>

      <DndContext sensors={sensores} collisionDetection={pointerWithin} onDragEnd={aoFinalizarArraste}>
        <section className="overflow-x-auto pb-3">
          <div className="flex min-w-max gap-4">
            {etapas.map((etapa) => (
              <ColunaFunil
                key={etapa.id}
                etapa={etapa}
                carregando={isLoading}
                oportunidades={oportunidadesFiltradas.filter((oportunidade) => oportunidade.idEtapa === etapa.id)}
                aoAbrirOportunidade={setOportunidadeAberta}
              />
            ))}
          </div>
        </section>
      </DndContext>

      <DetalhesOportunidade
        oportunidade={oportunidadeAberta}
        etapas={etapas}
        aberto={Boolean(oportunidadeAberta)}
        aoAlterarAberto={(aberto) => {
          if (!aberto) {
            setOportunidadeAberta(undefined);
          }
        }}
      />
    </div>
  );
}
