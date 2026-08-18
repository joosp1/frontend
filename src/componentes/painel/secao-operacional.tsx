import { AlertCircle, Clock3, Flame, MessageSquare, PhoneCall, UserRound } from "lucide-react";
import { Badge } from "@/componentes/ui/badge";
import { Botao } from "@/componentes/ui/botao";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import { formatarMoeda } from "@/lib/utils";

const atividades = [
  { contato: "Camila Rocha", acao: "enviou nova mensagem", horario: "09:22", responsavel: "IA", icone: MessageSquare },
  { contato: "Dr. Felipe Moura", acao: "solicitou demonstração", horario: "15:12", responsavel: "Rafael", icone: PhoneCall },
  { contato: "Juliana Matos", acao: "foi qualificada", horario: "Ontem", responsavel: "Marina", icone: UserRound },
];

const tarefas = [
  { titulo: "Retornar sobre orçamento", contato: "Renato Alves", vencimento: "Atrasada", prioridade: "Alta", responsavel: "Bianca" },
  { titulo: "Agendar demonstração", contato: "Dr. Felipe Moura", vencimento: "Amanhã 10:00", prioridade: "Alta", responsavel: "Rafael" },
  { titulo: "Enviar cardápio de automações", contato: "Camila Rocha", vencimento: "Hoje 16:00", prioridade: "Média", responsavel: "Marina" },
];

const oportunidades = [
  { contato: "Renato Alves", valor: 7600, etapa: "Proposta enviada", ultima: "há 2 dias" },
  { contato: "Dr. Felipe Moura", valor: 5200, etapa: "Em contato", ultima: "ontem" },
  { contato: "Juliana Matos", valor: 3800, etapa: "Qualificado", ultima: "há 2 dias" },
];

const atendimentos = [
  { nome: "Camila Rocha", espera: "12 min", motivo: "Dúvida sobre plano", prioridade: "Média" },
  { nome: "Paula Nunes", espera: "18 min", motivo: "Implantação", prioridade: "Alta" },
];

export function SecaoOperacional() {
  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-4">
      <Card>
        <CardCabecalho>
          <CardTitulo>Atividades recentes</CardTitulo>
          <CardDescricao>Movimentos do atendimento</CardDescricao>
        </CardCabecalho>
        <CardConteudo className="space-y-2.5">
          {atividades.map((atividade) => {
            const Icone = atividade.icone;
            return (
              <div key={`${atividade.contato}-${atividade.acao}`} className="flex gap-3">
                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-xl bg-highlight-soft p-2 text-secondary">
                  <Icone className="h-4 w-4" />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="font-medium">{atividade.contato}</p>
                  <p className="text-muted-foreground">{atividade.acao} · {atividade.horario}</p>
                  <p className="text-xs text-soft-foreground">{atividade.responsavel}</p>
                </div>
              </div>
            );
          })}
        </CardConteudo>
      </Card>

      <Card>
        <CardCabecalho>
          <CardTitulo>Tarefas prioritárias</CardTitulo>
          <CardDescricao>Pendências comerciais</CardDescricao>
        </CardCabecalho>
        <CardConteudo className="space-y-2.5">
          {tarefas.map((tarefa) => (
            <div key={tarefa.titulo} className="rounded-xl border bg-surface-secondary p-2.5 text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{tarefa.titulo}</p>
                <Badge className={tarefa.prioridade === "Alta" ? "border-red-200 bg-destructive-soft text-destructive" : "bg-warning-soft text-warning"}>{tarefa.prioridade}</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">{tarefa.contato} · {tarefa.vencimento}</p>
              <p className="mt-1 text-xs text-soft-foreground">{tarefa.responsavel}</p>
            </div>
          ))}
        </CardConteudo>
      </Card>

      <Card>
        <CardCabecalho>
          <CardTitulo>Oportunidades quentes</CardTitulo>
          <CardDescricao>Mais próximas de avançar</CardDescricao>
        </CardCabecalho>
        <CardConteudo className="space-y-2.5">
          {oportunidades.map((oportunidade) => (
            <div key={oportunidade.contato} className="rounded-xl border p-2.5 text-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">{oportunidade.contato}</p>
                <Flame className="h-4 w-4 text-warning" />
              </div>
              <p className="mt-1 font-semibold text-primary">{formatarMoeda(oportunidade.valor)}</p>
              <p className="text-muted-foreground">{oportunidade.etapa} · {oportunidade.ultima}</p>
              <Botao className="mt-2 w-full" variante="contorno" tamanho="pequeno">Abrir</Botao>
            </div>
          ))}
        </CardConteudo>
      </Card>

      <Card>
        <CardCabecalho>
          <CardTitulo>Aguardando humano</CardTitulo>
          <CardDescricao>Atendimentos em espera</CardDescricao>
        </CardCabecalho>
        <CardConteudo className="space-y-2.5">
          {atendimentos.map((atendimento) => (
            <div key={atendimento.nome} className="rounded-xl border p-2.5 text-sm">
              <div className="flex items-center justify-between">
                <p className="font-medium">{atendimento.nome}</p>
                <Badge className="bg-warning-soft text-warning"><Clock3 className="mr-1 h-3 w-3" />{atendimento.espera}</Badge>
              </div>
              <p className="mt-1 text-muted-foreground">{atendimento.motivo}</p>
              <div className="mt-3 flex items-center gap-2">
                <Badge className="border-red-200 bg-destructive-soft text-destructive"><AlertCircle className="mr-1 h-3 w-3" />{atendimento.prioridade}</Badge>
                <Botao className="ml-auto" tamanho="pequeno">Assumir</Botao>
              </div>
            </div>
          ))}
        </CardConteudo>
      </Card>
    </section>
  );
}
