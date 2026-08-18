"use client";

import { useQuery } from "@tanstack/react-query";
import { Building2, Camera, Download, Filter, Globe2, Plus, Search, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card } from "@/componentes/ui/card";
import { Drawer } from "@/componentes/ui/drawer";
import { Input } from "@/componentes/ui/input";
import { servicoDeContatos } from "@/servicos/servicos-simulados";
import type { Contato } from "@/tipos/crm";

function iniciais(nome: string) {
  return nome.split(" ").slice(0, 2).map((parte) => parte[0]).join("");
}

function IconeOrigem({ origem }: { origem?: string }) {
  if (origem === "Instagram") return <Camera className="h-4 w-4 text-purple" />;
  if (origem === "Site") return <Globe2 className="h-4 w-4 text-secondary" />;
  if (origem === "Indicação") return <UserRound className="h-4 w-4 text-secondary" />;
  return <span className="text-success">☘</span>;
}

export default function PaginaContatos() {
  const [busca, setBusca] = useState("");
  const [contatoAberto, setContatoAberto] = useState<Contato>();
  const { data: contatos = [] } = useQuery({ queryKey: ["contatos"], queryFn: servicoDeContatos.buscarContatos });

  const contatosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return contatos.filter((contato) =>
      [contato.nome, contato.telefone, contato.email, contato.empresa, contato.origem]
        .filter(Boolean)
        .some((valor) => valor?.toLowerCase().includes(termo)),
    );
  }, [busca, contatos]);

  return (
    <div className="space-y-3">
      <Card className="p-3">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" value={busca} onChange={(evento) => setBusca(evento.target.value)} placeholder="Buscar contato" />
          </div>
          <Botao variante="contorno"><Filter className="h-4 w-4" />Filtros</Botao>
          <Botao variante="contorno"><Download className="h-4 w-4" />Exportar</Botao>
          <Botao><Plus className="h-4 w-4" />Novo contato</Botao>
        </div>
      </Card>

      <Card className="hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b bg-surface-secondary text-xs uppercase text-muted-foreground">
              <tr>
                <th className="w-12 px-4 py-3"><input type="checkbox" aria-label="Selecionar todos" /></th>
                {["Nome", "Telefone", "E-mail", "Empresa", "Origem", "Responsável", "Etiquetas", "Última interação", "Situação"].map((coluna) => (
                  <th key={coluna} className="px-4 py-3 font-semibold">{coluna}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {contatosFiltrados.map((contato) => (
                <tr key={contato.id} className="cursor-pointer bg-card hover:bg-surface-secondary" onClick={() => setContatoAberto(contato)}>
                  <td className="px-4 py-3" onClick={(evento) => evento.stopPropagation()}><input type="checkbox" aria-label={`Selecionar ${contato.nome}`} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar><AvatarFallback>{iniciais(contato.nome)}</AvatarFallback></Avatar>
                      <span className="font-semibold">{contato.nome}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{contato.telefone} <span className="text-success">☘</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{contato.email}</td>
                  <td className="px-4 py-3">{contato.empresa}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-2 text-muted-foreground"><IconeOrigem origem={contato.origem} />{contato.origem}</span></td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2"><Avatar className="h-7 w-7"><AvatarFallback>{iniciais(contato.nomeResponsavel ?? "MC")}</AvatarFallback></Avatar>{contato.nomeResponsavel}</span>
                  </td>
                  <td className="px-4 py-3">{contato.etiquetas.map((etiqueta) => <Badge key={etiqueta.id} className="bg-highlight-soft text-secondary">{etiqueta.nome}</Badge>)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{contato.ultimaInteracaoEm?.toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-3"><Badge className="bg-success-soft text-success"><span className="mr-1 h-1.5 w-1.5 rounded-full bg-success" />ATIVO</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t px-4 py-3 text-sm text-muted-foreground">
          <span>{contatosFiltrados.length} contatos encontrados</span>
          <div className="flex items-center gap-2"><Botao variante="contorno" tamanho="pequeno">10 por página</Botao><Botao tamanho="pequeno">1</Botao></div>
        </div>
      </Card>

      <div className="grid gap-3 md:hidden">
        {contatosFiltrados.map((contato) => (
          <Card key={contato.id} className="p-4" onClick={() => setContatoAberto(contato)}>
            <div className="flex items-start gap-3">
              <Avatar><AvatarFallback>{iniciais(contato.nome)}</AvatarFallback></Avatar>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{contato.nome}</p>
                <p className="truncate text-sm text-muted-foreground">{contato.telefone} · {contato.email}</p>
                <p className="mt-1 flex items-center gap-1 text-sm"><Building2 className="h-4 w-4" />{contato.empresa}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge className="bg-success-soft text-success">ATIVO</Badge>
                  {contato.etiquetas.map((etiqueta) => <Badge key={etiqueta.id}>{etiqueta.nome}</Badge>)}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Drawer aberto={Boolean(contatoAberto)} aoAlterarAberto={(aberto) => !aberto && setContatoAberto(undefined)} titulo={contatoAberto?.nome ?? "Contato"}>
        <div className="space-y-4 text-sm">
          <div className="rounded-lg border p-4"><p className="text-muted-foreground">Telefone</p><p className="font-medium">{contatoAberto?.telefone}</p></div>
          <div className="rounded-lg border p-4"><p className="text-muted-foreground">Empresa</p><p className="font-medium">{contatoAberto?.empresa}</p></div>
          <div className="rounded-lg border p-4"><p className="text-muted-foreground">Responsável</p><p className="font-medium">{contatoAberto?.nomeResponsavel}</p></div>
        </div>
      </Drawer>
    </div>
  );
}
