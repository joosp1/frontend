"use client";

import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import type { PontoGrafico } from "@/tipos/crm";

export function GraficoTempoResposta({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Tempo médio de resposta</CardTitulo>
        <CardDescricao>Tempo em segundos por dia</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dados} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip />
              <Line dataKey="valor" stroke="#22A06B" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
