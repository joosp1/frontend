import { Badge } from "@/componentes/ui/badge";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";

export function TabelaTopAtendentes({
  atendentes,
}: {
  atendentes: Array<{ nome: string; conversas: number; resolucao: string; tempoMedio: string; satisfacao: string }>;
}) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Top atendentes</CardTitulo>
        <CardDescricao>Performance no período selecionado</CardDescricao>
      </CardCabecalho>
      <CardConteudo>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="text-xs text-muted-foreground">
              <tr>
                <th className="py-2 font-medium">Atendente</th>
                <th className="py-2 font-medium">Conversas</th>
                <th className="py-2 font-medium">Resolução</th>
                <th className="py-2 font-medium">Tempo médio</th>
                <th className="py-2 font-medium">Satisfação</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {atendentes.map((atendente) => (
                <tr key={atendente.nome}>
                  <td className="py-2 font-medium">{atendente.nome}</td>
                  <td className="py-2 text-muted-foreground">{atendente.conversas}</td>
                  <td className="py-2"><Badge className="bg-success-soft text-success">{atendente.resolucao}</Badge></td>
                  <td className="py-2 text-muted-foreground">{atendente.tempoMedio}</td>
                  <td className="py-2 text-muted-foreground">{atendente.satisfacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid gap-2 md:hidden">
          {atendentes.map((atendente) => (
            <div key={atendente.nome} className="rounded-xl border bg-surface-secondary p-3 text-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate font-medium">{atendente.nome}</p>
                <Badge className="bg-success-soft text-success">{atendente.resolucao}</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">{atendente.conversas} conversas · {atendente.tempoMedio}</p>
              <p className="text-xs text-soft-foreground">Satisfação {atendente.satisfacao}</p>
            </div>
          ))}
        </div>
      </CardConteudo>
    </Card>
  );
}
