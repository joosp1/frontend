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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import type { PontoGrafico } from "@/tipos/crm";

export function GraficoCartao({
  titulo,
  descricao,
  dados,
  tipo = "area",
}: {
  titulo: string;
  descricao: string;
  dados: PontoGrafico[];
  tipo?: "area" | "barra" | "linha";
}) {
  return (
    <Card>
      <CardCabecalho>
        <CardTitulo>{titulo}</CardTitulo>
        <CardDescricao>{descricao}</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            {tipo === "barra" ? (
              <BarChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                  {dados.map((_, indice) => (
                    <Cell key={indice} fill={indice % 2 === 0 ? "#0F3D5E" : "#2563EB"} />
                  ))}
                </Bar>
              </BarChart>
            ) : tipo === "linha" ? (
              <LineChart data={dados}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#2563EB" strokeWidth={3} dot={false} />
              </LineChart>
            ) : (
              <AreaChart data={dados}>
                <defs>
                  <linearGradient id={`grafico-${titulo}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={12} />
                <YAxis tickLine={false} axisLine={false} fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="valor" stroke="#2563EB" fill={`url(#grafico-${titulo})`} strokeWidth={3} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
