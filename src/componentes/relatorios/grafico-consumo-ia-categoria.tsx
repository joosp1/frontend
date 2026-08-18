"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import type { PontoGrafico } from "@/tipos/crm";

export function GraficoConsumoIaCategoria({ dados }: { dados: PontoGrafico[] }) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Consumo de IA por categoria</CardTitulo>
        <CardDescricao>Tokens por funcionalidade</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="h-[210px] sm:h-[230px] lg:h-[250px] 2xl:h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dados} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid stroke="#E7EBF0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="nome" tickLine={false} axisLine={false} fontSize={11} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} />
              <Tooltip />
              <Bar dataKey="valor" fill="#7C5CFC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardConteudo>
    </Card>
  );
}
