"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const nomes: Record<string, string> = {
  painel: "Painel",
  crm: "CRM",
  oportunidades: "Oportunidades",
  contatos: "Contatos",
  tarefas: "Tarefas",
  conversas: "Conversas",
  consumo: "Consumo",
  configuracoes: "Configurações",
};

export function BreadcrumbAplicacao() {
  const partes = usePathname().split("/").filter(Boolean);

  return (
    <div className="flex h-5 items-center gap-1 text-xs text-muted-foreground">
      <span>Livedo</span>
      {partes.map((parte) => (
        <div key={parte} className="flex items-center gap-1">
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{nomes[parte] ?? parte}</span>
        </div>
      ))}
    </div>
  );
}
