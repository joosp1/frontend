"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, CheckCircle2, Clock, ListChecks, MoreHorizontal, Plus, Trash2, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card, CardConteudo } from "@/componentes/ui/card";
import { Input } from "@/componentes/ui/input";
import { servicoDeTarefas } from "@/servicos/servicos-simulados";

const esquemaTarefa = z.object({
  titulo: z.string().min(3, "Informe ao menos 3 caracteres"),
});

type FormularioTarefa = z.infer<typeof esquemaTarefa>;

const abas = ["lista", "hoje", "proximas", "atrasadas", "concluidas"] as const;

export default function PaginaTarefas() {
  const [aba, setAba] = useState<(typeof abas)[number]>("lista");
  const { data: tarefas = [] } = useQuery({ queryKey: ["tarefas"], queryFn: servicoDeTarefas.buscarTarefas });
  const formulario = useForm<FormularioTarefa>({ resolver: zodResolver(esquemaTarefa), defaultValues: { titulo: "" } });

  const tarefasFiltradas = useMemo(() => {
    if (aba === "atrasadas") return tarefas.filter((tarefa) => tarefa.situacao === "ATRASADA");
    if (aba === "concluidas") return tarefas.filter((tarefa) => tarefa.situacao === "CONCLUIDA");
    if (aba === "hoje") return tarefas.filter((tarefa) => tarefa.vencimentoEm.toDateString() === new Date("2026-08-04").toDateString());
    if (aba === "proximas") return tarefas.filter((tarefa) => tarefa.situacao === "PENDENTE");
    return tarefas;
  }, [aba, tarefas]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {abas.map((item) => (
            <Botao key={item} variante={aba === item ? "primario" : "contorno"} tamanho="pequeno" className="shrink-0" onClick={() => setAba(item)}>
              {item === "lista" ? "Lista" : item === "proximas" ? "Próximas" : item.charAt(0).toUpperCase() + item.slice(1)}
            </Botao>
          ))}
        </div>
        <form
          className="flex min-w-0 gap-2"
          onSubmit={formulario.handleSubmit(() => formulario.reset())}
        >
          <Input className="min-w-0 sm:w-96" placeholder="Nova tarefa rápida" {...formulario.register("titulo")} />
          <Botao type="submit"><Plus className="h-4 w-4" />Criar</Botao>
        </form>
      </div>

      <div className="grid gap-3">
        {tarefasFiltradas.map((tarefa) => (
          <Card key={tarefa.id} className="hover:shadow-[0_14px_32px_rgba(18,62,90,0.09)]">
            <CardConteudo className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-3">
                <div className={`rounded-2xl p-3 ${tarefa.situacao === "CONCLUIDA" ? "bg-success-soft text-success" : tarefa.situacao === "ATRASADA" ? "bg-destructive-soft text-destructive" : "bg-highlight-soft text-secondary"}`}>
                  {tarefa.situacao === "CONCLUIDA" ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{tarefa.titulo}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                    <UserRound className="h-4 w-4" /> {tarefa.nomeContato} · {tarefa.nomeOportunidade} · {tarefa.nomeResponsavel}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <Badge className={tarefa.prioridade === "ALTA" ? "bg-destructive-soft text-destructive" : tarefa.prioridade === "BAIXA" ? "bg-success-soft text-success" : "bg-highlight-soft text-secondary"}>{tarefa.prioridade}</Badge>
                <Badge className="bg-surface-secondary text-muted-foreground"><CalendarDays className="mr-1 h-4 w-4" />{tarefa.vencimentoEm.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</Badge>
                <Botao variante="contorno" tamanho="pequeno"><ListChecks className="h-4 w-4" />Editar</Botao>
                <Botao variante="contorno" tamanho="pequeno"><CheckCircle2 className="h-4 w-4" />Concluir</Botao>
                <Botao variante="fantasma" tamanho="icone" aria-label="Mais ações"><MoreHorizontal className="h-4 w-4" /></Botao>
                <Botao variante="fantasma" tamanho="icone" aria-label="Excluir tarefa"><Trash2 className="h-4 w-4" /></Botao>
              </div>
            </CardConteudo>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-2 text-xs text-muted-foreground">
        <span className="self-center">Exibindo 1-6 de {tarefas.length} tarefas</span>
        <Botao variante="contorno" tamanho="pequeno">1</Botao>
      </div>
    </div>
  );
}
