"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SidebarAplicacao } from "@/componentes/layout/sidebar";
import { TopbarAplicacao } from "@/componentes/layout/topbar";
import { servicoDeSessao } from "@/servicos/servicos-simulados";

export default function LayoutAutenticado({ children }: { children: React.ReactNode }) {
  const [sidebarRecolhida, setSidebarRecolhida] = useState(false);
  const { data } = useQuery({
    queryKey: ["sessao"],
    queryFn: servicoDeSessao.buscarContexto,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <SidebarAplicacao
          plano={data?.empresaAtual.plano}
          recolhida={sidebarRecolhida}
          aoAlternarRecolhida={() => setSidebarRecolhida((valor) => !valor)}
        />
      </div>
      <div className={`min-h-screen min-w-0 transition-[padding] duration-200 ${sidebarRecolhida ? "lg:pl-[84px]" : "lg:pl-[284px]"}`}>
        <TopbarAplicacao />
        <main className="mx-auto flex w-full max-w-[1640px] min-w-0 flex-col gap-3 px-3 py-3 lg:px-4">
          {children}
        </main>
      </div>
    </div>
  );
}
