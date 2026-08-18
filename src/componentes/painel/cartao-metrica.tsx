import type { LucideIcon } from "lucide-react";
import { Card } from "@/componentes/ui/card";
import { cn } from "@/lib/utils";

const tons = {
  operacao: {
    icone: "bg-highlight-soft text-secondary",
    comparacao: "text-success",
    detalhe: "bg-highlight-soft",
  },
  financeiro: {
    icone: "bg-success-soft text-success",
    comparacao: "text-success",
    detalhe: "bg-success-soft",
  },
  ia: {
    icone: "bg-purple-soft text-purple",
    comparacao: "text-purple",
    detalhe: "bg-purple-soft",
  },
  alerta: {
    icone: "bg-warning-soft text-warning",
    comparacao: "text-warning",
    detalhe: "bg-warning-soft",
  },
};

const alturasSparkline = ["h-[42%]", "h-[64%]", "h-[50%]", "h-[78%]", "h-[58%]", "h-[86%]"];

export function CartaoMetrica({
  titulo,
  valor,
  comparacao,
  auxiliar,
  icone: Icone,
  tom = "operacao",
  compacto = false,
}: {
  titulo: string;
  valor: string;
  comparacao: string;
  auxiliar: string;
  icone: LucideIcon;
  tom?: keyof typeof tons;
  compacto?: boolean;
}) {
  const cores = tons[tom];

  return (
    <Card className="group min-w-0 overflow-hidden hover:shadow-[0_14px_32px_rgba(18,62,90,0.09)]">
      <div className={cn("flex h-full flex-col justify-between p-3", compacto ? "min-h-[112px]" : "min-h-[120px]")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-muted-foreground">{titulo}</p>
            <p className="mt-1 truncate text-xl font-[700] text-foreground md:text-2xl">{valor}</p>
          </div>
          <div className={cn("shrink-0 rounded-xl p-2", cores.icone)}>
            <Icone className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className={cn("truncate text-xs font-semibold", cores.comparacao)}>{comparacao}</p>
            <p className="mt-1 truncate text-xs text-soft-foreground">{auxiliar}</p>
          </div>
          <div className="hidden h-6 shrink-0 items-end gap-1 sm:flex" aria-hidden="true">
            {alturasSparkline.map((altura, indice) => (
              <span
                key={indice}
                className={cn("w-1.5 rounded-full", altura, cores.detalhe)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
