"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Botao } from "@/componentes/ui/botao";
import { cn } from "@/lib/utils";

export function Drawer({
  aberto,
  aoAlterarAberto,
  titulo,
  children,
  className,
}: {
  aberto: boolean;
  aoAlterarAberto: (aberto: boolean) => void;
  titulo: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Dialog.Root open={aberto} onOpenChange={aoAlterarAberto}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-950/25" />
        <Dialog.Content
          className={cn(
            "fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col border-l bg-card shadow-xl outline-none",
            className,
          )}
        >
          <div className="flex items-center justify-between border-b px-5 py-4">
            <Dialog.Title className="text-base font-semibold">{titulo}</Dialog.Title>
            <Dialog.Close asChild>
              <Botao variante="fantasma" tamanho="icone" aria-label="Fechar">
                <X className="h-4 w-4" />
              </Botao>
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
