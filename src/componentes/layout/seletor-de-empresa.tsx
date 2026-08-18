import { Building2, ChevronDown } from "lucide-react";

export function SeletorDeEmpresa({ nome = "Empresa" }: { nome?: string }) {
  return (
    <button
      className="hidden h-10 min-w-0 max-w-[150px] shrink-0 items-center gap-2 overflow-hidden rounded-xl border bg-card px-3 text-sm font-medium shadow-sm md:flex xl:max-w-[180px] 2xl:max-w-[220px]"
      aria-label={`Empresa atual: ${nome}`}
      title={nome}
    >
      <Building2 className="h-4 w-4 shrink-0 text-primary" />
      <span className="min-w-0 truncate whitespace-nowrap">{nome}</span>
      <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground xl:block" />
    </button>
  );
}
