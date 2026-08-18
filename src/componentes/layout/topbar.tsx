"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { AcoesDaTopbar } from "@/componentes/layout/acoes-da-topbar";
import { BuscaGlobal } from "@/componentes/layout/busca-global";
import { LogoLivedo } from "@/componentes/layout/logo-livedo";
import { MenuDoUsuario } from "@/componentes/layout/menu-do-usuario";
import { SeletorDeEmpresa } from "@/componentes/layout/seletor-de-empresa";
import { SidebarAplicacao } from "@/componentes/layout/sidebar";
import { Botao } from "@/componentes/ui/botao";
import { servicoDeSessao } from "@/servicos/servicos-simulados";
import { useState } from "react";

export function TopbarAplicacao() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { data } = useQuery({
    queryKey: ["sessao"],
    queryFn: servicoDeSessao.buscarContexto,
  });

  const empresa = data?.empresaAtual;
  const usuario = data?.usuarioAtual;

  return (
    <header className="sticky top-0 z-30 flex h-[72px] min-w-0 items-center gap-2 border-b bg-card/95 px-3 shadow-[0_8px_24px_rgba(18,62,90,0.04)] backdrop-blur-xl sm:gap-3 lg:px-4 xl:px-5">
      <Dialog.Root open={menuAberto} onOpenChange={setMenuAberto}>
        <Dialog.Trigger asChild>
          <Botao variante="fantasma" tamanho="icone" className="lg:hidden" aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </Botao>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/25 lg:hidden" />
          <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-[292px] bg-primary-dark outline-none lg:hidden">
            <Dialog.Title className="sr-only">Menu principal</Dialog.Title>
            <SidebarAplicacao emDrawer plano={empresa?.plano} aoNavegar={() => setMenuAberto(false)} />
            <Dialog.Close asChild>
              <Botao className="absolute right-3 top-3" variante="fantasma" tamanho="icone" aria-label="Fechar menu">
                <X className="h-4 w-4" />
              </Botao>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="lg:hidden">
        <LogoLivedo compacto claro={false} />
      </div>

      <BuscaGlobal className="max-w-[240px] lg:max-w-[300px] xl:max-w-[420px] 2xl:max-w-2xl" />

      <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
        <AcoesDaTopbar />
        <SeletorDeEmpresa nome={empresa?.nome ?? "Empresa"} />
        <MenuDoUsuario nome={usuario?.nome ?? "Usuário"} cargo={usuario?.cargo ?? "Equipe"} />
      </div>
    </header>
  );
}
