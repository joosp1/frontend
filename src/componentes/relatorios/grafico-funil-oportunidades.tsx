"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import type { PontoGrafico } from "@/tipos/crm";

export function GraficoFunilOportunidades({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Funil de oportunidades</CardTitulo>
        <CardDescricao>Quantidade e valor por etapa</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados} layout="vertical" margin={{ top: 8, right: 8, left: 24, bottom: 0 }}>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis type="category" dataKey="nome" tickLine={false} axisLine={false} fontSize={11} width={76} />
              <Tooltip />
              <Bar dataKey="valor" fill="#123E5A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
