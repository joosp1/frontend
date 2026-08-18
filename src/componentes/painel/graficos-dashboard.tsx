"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import { Botao } from "@/componentes/ui/botao";
import type { PontoGrafico } from "@/tipos/crm";

function TooltipGrafico({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border bg-card px-3 py-2 text-sm shadow-lg">
      <p className="font-semibold text-foreground">{label}</p>
      <p className="text-muted-foreground">{payload[0].value.toLocaleString("pt-BR")}</p>
    </div>
  );
}

export function GraficoDeOportunidades({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card>
      <CardCabecalho className="flex-col items-start justify-between gap-2 pb-2 sm:flex-row sm:gap-3">
        <div>
          <CardTitulo>Oportunidades por etapa</CardTitulo>
          <CardDescricao>Funil de vendas · quantidade</CardDescricao>
        </div>
        <div className="flex gap-1">
          <Botao variante="contorno" tamanho="pequeno">Funil</Botao>
          <Botao variante="fantasma" tamanho="pequeno">Valor</Botao>
        </div>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados} margin={{ top: 12, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={11} interval={0} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} allowDecimals={false} />
              <Tooltip content={<TooltipGrafico />} cursor={{ fill: "#F9FAFC" }} />
              <Bar dataKey="valor" radius={[10, 10, 0, 0]} label={{ position: "top", fill: "#667085", fontSize: 12 }}>
                {dados.map((item, indice) => {
                  const cor = item.nome === "Convertido" ? "#22A06B" : item.nome === "Perdido" ? "#D94C4C" : ["#123E5A", "#2F6BFF", "#7C5CFC", "#E7A21A"][indice % 4];
                  return <Cell key={item.nome} fill={cor} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}

export function GraficoDeConversas({ dados }: { dados: PontoGrafico[] }) {
  const total = dados.reduce((soma, item) => soma + item.valor, 0);
  const media = Math.round(total / Math.max(dados.length, 1));
  const pico = Math.max(...dados.map((item) => item.valor), 0);

  return (
    <Card>
      <CardCabecalho className="flex-col items-start justify-between gap-2 pb-2 sm:flex-row sm:gap-3">
        <div>
          <CardTitulo>Novas conversas por dia</CardTitulo>
          <CardDescricao>Total {total} · média {media}/dia · pico {pico}</CardDescricao>
        </div>
        <Botao variante="contorno" tamanho="pequeno">7 dias</Botao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dados} margin={{ top: 12, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="conversasGradiente" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F6BFF" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#2F6BFF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip content={<TooltipGrafico />} />
              <Area type="monotone" dataKey="valor" stroke="#2F6BFF" strokeWidth={3} fill="url(#conversasGradiente)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}

export function GraficoDeConversao({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card>
      <CardCabecalho className="pb-2">
        <CardTitulo>Conversão por período</CardTitulo>
        <CardDescricao><span className="text-xl font-[700] text-foreground">31%</span> · +4 p.p. vs mês anterior</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dados} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(valor) => `${Math.round(Number(valor) * 100)}%`} />
              <Tooltip content={<TooltipGrafico />} />
              <Line type="monotone" dataKey="valor" stroke="#22A06B" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}

export function GraficoDeConsumoIa({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card>
      <CardCabecalho className="pb-2">
        <CardTitulo>Consumo de IA</CardTitulo>
        <CardDescricao>1,55M tokens · R$ 1.240 estimados · 62% do limite</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="mb-2 grid grid-cols-4 gap-2 text-[11px] text-muted-foreground">
          {["70%", "85%", "95%", "100%"].map((marcador) => (
            <span key={marcador} className="rounded-lg bg-purple-soft px-2 py-1 text-center text-purple">{marcador}</span>
          ))}
        </div>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dados} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="consumoGradiente" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7C5CFC" stopOpacity={0.22} />
                  <stop offset="95%" stopColor="#7C5CFC" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={12} />
              <Tooltip content={<TooltipGrafico />} />
              <ReferenceLine y={175000} stroke="#E7A21A" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="valor" stroke="#7C5CFC" strokeWidth={3} fill="url(#consumoGradiente)" dot={false} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
