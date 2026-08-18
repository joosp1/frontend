"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import type { PontoGrafico } from "@/tipos/crm";

export function GraficoEvolucaoConversas({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Evolução de conversas</CardTitulo>
        <CardDescricao>Comparação semanal com período anterior</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dados} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <defs>
                <linearGradient id="evolucaoConversas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2F6BFF" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2F6BFF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip />
              <Area dataKey="secundario" stroke="#98A2B3" fill="transparent" strokeDasharray="4 4" />
              <Area dataKey="valor" stroke="#2F6BFF" fill="url(#evolucaoConversas)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
