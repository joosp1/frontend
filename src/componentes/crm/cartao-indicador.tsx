import type { LucideIcon } from "lucide-react";
import { Card, CardConteudo } from "@/componentes/ui/card";

export function CartaoIndicador({
  titulo,
  valor,
  descricao,
  icone: Icone,
  tom = "azul",
}: {
  titulo: string;
  valor: string;
  descricao: string;
  icone: LucideIcon;
  tom?: "azul" | "verde" | "amarelo" | "vermelho";
}) {
  const cores = {
    azul: "bg-blue-50 text-secondary",
    verde: "bg-emerald-50 text-success",
    amarelo: "bg-amber-50 text-warning",
    vermelho: "bg-red-50 text-destructive",
  };

  return (
    <Card>
      <CardConteudo className="flex items-start justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{titulo}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{valor}</p>
          <p className="mt-1 text-xs text-muted-foreground">{descricao}</p>
        </div>
        <div className={`rounded-md p-2 ${cores[tom]}`}>
          <Icone className="h-5 w-5" />
        </div>
      </CardConteudo>
    </Card>
  );
}
