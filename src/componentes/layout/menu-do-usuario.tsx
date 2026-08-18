import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";

function obterIniciais(nome: string) {
  return nome
    .split(" ")
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();
}

export function MenuDoUsuario({ nome = "Usuário", cargo = "Equipe" }: { nome?: string; cargo?: string }) {
  return (
    <button
      className="flex h-10 min-w-0 max-w-[52px] shrink-0 items-center gap-2 overflow-hidden rounded-xl border bg-card px-1.5 py-1.5 shadow-sm sm:max-w-[168px] sm:px-2 xl:max-w-[220px]"
      aria-label={`Menu do usuário: ${nome}`}
      title={nome}
    >
      <Avatar className="h-7 w-7 shrink-0">
        <AvatarFallback>{obterIniciais(nome) || "LV"}</AvatarFallback>
      </Avatar>
      <div className="hidden min-w-0 text-left leading-tight sm:block">
        <p className="truncate whitespace-nowrap text-xs font-semibold">{nome}</p>
        <p className="hidden truncate whitespace-nowrap text-[11px] text-muted-foreground xl:block">{cargo}</p>
      </div>
      <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 text-muted-foreground xl:block" />
    </button>
  );
}
