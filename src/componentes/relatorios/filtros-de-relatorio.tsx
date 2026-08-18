"use client";

import { Download, Filter, RotateCcw, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Botao } from "@/componentes/ui/botao";
import { Card } from "@/componentes/ui/card";
import { Drawer } from "@/componentes/ui/drawer";

const filtros = ["Agosto 2026", "WhatsApp", "Todos responsáveis"];

function ConteudoFiltros() {
  return (
    <>
      {filtros.map((filtro) => (
        <button
          key={filtro}
          className="h-10 min-w-0 rounded-xl border bg-card px-3 text-left text-sm font-medium text-foreground shadow-sm"
        >
          <span className="block truncate whitespace-nowrap">{filtro}</span>
        </button>
      ))}
      <Botao variante="contorno">
        <RotateCcw className="h-4 w-4" />
        Limpar
      </Botao>
      <Botao>
        <SlidersHorizontal className="h-4 w-4" />
        Aplicar
      </Botao>
    </>
  );
}

export function FiltrosDeRelatorio() {
  const [aberto, setAberto] = useState(false);

  return (
    <>
      <Card className="hidden p-3 md:block">
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_auto_auto_auto_auto]">
          <ConteudoFiltros />
          <Botao variante="contorno">
            <Download className="h-4 w-4" />
            PDF
          </Botao>
          <Botao variante="contorno">
            <Download className="h-4 w-4" />
            CSV
          </Botao>
        </div>
      </Card>

      <div className="flex gap-2 md:hidden">
        <Botao className="flex-1" variante="contorno" onClick={() => setAberto(true)}>
          <Filter className="h-4 w-4" />
          Filtros
        </Botao>
        <Botao variante="contorno">
          <Download className="h-4 w-4" />
          Exportar
        </Botao>
      </div>

      <Drawer aberto={aberto} aoAlterarAberto={setAberto} titulo="Filtros">
        <div className="grid gap-3">
          <ConteudoFiltros />
          <div className="grid grid-cols-2 gap-2 pt-2">
            <Botao variante="contorno">
              <Download className="h-4 w-4" />
              PDF
            </Botao>
            <Botao variante="contorno">
              <Download className="h-4 w-4" />
              CSV
            </Botao>
          </div>
        </div>
      </Drawer>
    </>
  );
}
