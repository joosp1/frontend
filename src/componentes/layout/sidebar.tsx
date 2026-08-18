"use client";

import {
  BarChart3,
  CheckSquare,
  Contact,
  FileBarChart,
  LayoutDashboard,
  MessageCircle,
  Settings,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoLivedo } from "@/componentes/layout/logo-livedo";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";
import { cn } from "@/lib/utils";

const gruposMenu = [
  {
    titulo: "Operação",
    itens: [
      { titulo: "Visão geral", href: "/painel", icone: LayoutDashboard },
      { titulo: "Conversas", href: "/conversas", icone: MessageCircle, badge: "8" },
    ],
  },
  {
    titulo: "Relacionamento",
    itens: [
      { titulo: "CRM", href: "/crm", icone: TrendingUp },
      { titulo: "Contatos", href: "/crm/contatos", icone: Contact },
      { titulo: "Tarefas", href: "/crm/tarefas", icone: CheckSquare, badge: "3" },
    ],
  },
  {
    titulo: "Gestão",
    itens: [
      { titulo: "Consumo", href: "/consumo", icone: BarChart3 },
      { titulo: "Relatórios", href: "/relatorios", icone: FileBarChart },
      { titulo: "Configurações", href: "/configuracoes", icone: Settings },
    ],
  },
];

function itemAtivo(caminhoAtual: string, href: string) {
  if (href === "/crm") {
    return caminhoAtual === href || caminhoAtual === "/crm/oportunidades";
  }

  if (href === "/painel" || href === "/relatorios") {
    return caminhoAtual === href;
  }

  return caminhoAtual === href || caminhoAtual.startsWith(`${href}/`);
}

export function SidebarAplicacao({
  plano = "Profissional",
  emDrawer = false,
  aoNavegar,
  recolhida = false,
  aoAlternarRecolhida,
}: {
  plano?: string;
  emDrawer?: boolean;
  aoNavegar?: () => void;
  recolhida?: boolean;
  aoAlternarRecolhida?: () => void;
}) {
  const caminhoAtual = usePathname();
  const compacta = recolhida && !emDrawer;

  return (
    <aside
      className={cn(
        "flex h-full min-w-0 flex-col overflow-hidden bg-primary-dark text-white transition-[width] duration-200",
        compacta ? "w-[84px]" : "w-[284px]",
        emDrawer && "w-full border-r-0",
      )}
    >
      <div className={cn("flex h-[72px] items-center px-4", compacta ? "justify-center" : "justify-start")}>
        <LogoLivedo
          compacto={compacta}
          onClick={!emDrawer ? aoAlternarRecolhida : undefined}
          ariaLabel={compacta ? "Expandir menu lateral" : "Recolher menu lateral"}
        />
      </div>

      <nav className="flex-1 space-y-4 overflow-y-auto px-4 pb-3 pt-1">
        {gruposMenu.map((grupo) => (
          <div key={grupo.titulo} className="space-y-1.5">
            {!compacta ? (
              <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/35">{grupo.titulo}</p>
            ) : null}
            <div className="space-y-1">
              {grupo.itens.map((item) => {
                const ativo = itemAtivo(caminhoAtual, item.href);
                const Icone = item.icone;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={aoNavegar}
                    className={cn(
                      "relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium text-white/68 transition-colors hover:bg-white/8 hover:text-white",
                      ativo && "bg-secondary text-white shadow-[0_14px_30px_rgba(47,107,255,0.25)]",
                      compacta && "justify-center px-0",
                    )}
                    title={compacta ? item.titulo : undefined}
                  >
                    <Icone className="h-4 w-4 shrink-0" />
                    {compacta && item.badge ? (
                      <span className="absolute right-2 top-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-primary-dark" />
                    ) : null}
                    {!compacta ? (
                      <>
                        <span className="min-w-0 flex-1">{item.titulo}</span>
                        {item.badge ? (
                          <span className="rounded-full bg-white/12 px-2 py-0.5 text-[11px] text-white">{item.badge}</span>
                        ) : null}
                      </>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-2.5 p-3">
        <div
          className={cn(
            "rounded-2xl border border-white/10 bg-white/8 p-3",
            compacta && "mx-auto flex h-11 w-11 items-center justify-center px-0 py-0 text-center",
          )}
          title={compacta ? `Plano ${plano}: 62% utilizado` : undefined}
        >
          <p className={cn("text-xs text-white/45", compacta && "sr-only")}>{compacta ? "Plano" : "Plano atual"}</p>
          {compacta ? <span className="text-xs font-semibold text-white">62%</span> : null}
          {!compacta ? (
            <>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{plano}</p>
                <span className="text-xs text-white/50">62%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[62%] rounded-full bg-secondary" />
              </div>
              <p className="mt-1.5 text-xs text-white/45">Renova em 28/08</p>
            </>
          ) : null}
        </div>
        <div className={cn("flex items-center gap-3 rounded-2xl bg-white/6 p-2.5", compacta && "justify-center p-2")}>
          <Avatar>
            <AvatarFallback className="bg-white/12 text-white">MC</AvatarFallback>
          </Avatar>
          {!compacta ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">Marina Costa</p>
              <p className="truncate text-xs text-white/45">Gestora de atendimento</p>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
