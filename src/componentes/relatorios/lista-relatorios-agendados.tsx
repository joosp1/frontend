import { CalendarClock } from "lucide-react";
import { Badge } from "@/componentes/ui/badge";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";

export function ListaRelatoriosAgendados({
  relatorios,
}: {
  relatorios: Array<{ nome: string; frequencia: string; destino: string; status: string }>;
}) {
  return (
    <Card className="min-w-0">
      <CardCabecalho>
        <CardTitulo>Relatórios agendados</CardTitulo>
        <CardDescricao>Envios automáticos configurados</CardDescricao>
      </CardCabecalho>
      <CardConteudo className="grid gap-2">
        {relatorios.map((relatorio) => (
          <div key={relatorio.nome} className="flex min-w-0 items-center gap-3 rounded-xl border bg-surface-secondary p-3">
            <div className="rounded-xl bg-highlight-soft p-2 text-secondary">
              <CalendarClock className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{relatorio.nome}</p>
              <p className="truncate text-xs text-muted-foreground">{relatorio.frequencia} · {relatorio.destino}</p>
            </div>
            <Badge className={relatorio.status === "Ativo" ? "bg-success-soft text-success" : "bg-warning-soft text-warning"}>
              {relatorio.status}
            </Badge>
          </div>
        ))}
      </CardConteudo>
    </Card>
  );
}
