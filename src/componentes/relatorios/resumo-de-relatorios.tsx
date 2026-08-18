import { Bot, MessageCircle, Target, TrendingUp } from "lucide-react";
import { CartaoMetrica } from "@/componentes/painel/cartao-metrica";
import { formatarMoeda, formatarPercentual } from "@/lib/utils";

export function ResumoDeRelatorios({
  metricas,
}: {
  metricas?: { conversas: number; oportunidades: number; conversao: number; custoIa: number };
}) {
  return (
    <section className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
      <CartaoMetrica titulo="Conversas" valor={(metricas?.conversas ?? 0).toLocaleString("pt-BR")} comparacao="+14% vs período anterior" auxiliar="Volume consolidado" icone={MessageCircle} compacto />
      <CartaoMetrica titulo="Oportunidades" valor={String(metricas?.oportunidades ?? 0)} comparacao="+9% no período" auxiliar="Criadas no CRM" icone={Target} compacto />
      <CartaoMetrica titulo="Conversão" valor={formatarPercentual(metricas?.conversao)} comparacao="+4 p.p." auxiliar="Ganhas sobre qualificadas" icone={TrendingUp} tom="financeiro" compacto />
      <CartaoMetrica titulo="Custo de IA" valor={formatarMoeda(metricas?.custoIa)} comparacao="Dentro do previsto" auxiliar="Estimativa do período" icone={Bot} tom="ia" compacto />
    </section>
  );
}
