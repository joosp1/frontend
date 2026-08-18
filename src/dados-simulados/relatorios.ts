import type { PontoGrafico } from "@/tipos/crm";

export const evolucaoConversasRelatorio: PontoGrafico[] = [
  { nome: "Sem 1", valor: 824, secundario: 760 },
  { nome: "Sem 2", valor: 940, secundario: 812 },
  { nome: "Sem 3", valor: 1018, secundario: 884 },
  { nome: "Sem 4", valor: 1126, secundario: 930 },
];

export const funilOportunidadesRelatorio: PontoGrafico[] = [
  { nome: "Novo lead", valor: 42, secundario: 58000 },
  { nome: "Em contato", valor: 31, secundario: 47500 },
  { nome: "Qualificado", valor: 24, secundario: 39800 },
  { nome: "Proposta", valor: 16, secundario: 32100 },
  { nome: "Convertido", valor: 12, secundario: 24600 },
];

export const consumoIaCategoriaRelatorio: PontoGrafico[] = [
  { nome: "Atendimento", valor: 620000 },
  { nome: "CRM", valor: 310000 },
  { nome: "Resumos", valor: 210000 },
  { nome: "Busca", valor: 100000 },
];

export const tempoRespostaRelatorio: PontoGrafico[] = [
  { nome: "Seg", valor: 42 },
  { nome: "Ter", valor: 38 },
  { nome: "Qua", valor: 35 },
  { nome: "Qui", valor: 31 },
  { nome: "Sex", valor: 28 },
  { nome: "Sáb", valor: 33 },
  { nome: "Dom", valor: 36 },
];

export const topAtendentesRelatorio = [
  { nome: "Marina Costa", conversas: 284, resolucao: "91%", tempoMedio: "28s", satisfacao: "4,8" },
  { nome: "Rafael Lima", conversas: 236, resolucao: "87%", tempoMedio: "34s", satisfacao: "4,6" },
  { nome: "Bianca Souza", conversas: 198, resolucao: "84%", tempoMedio: "41s", satisfacao: "4,5" },
  { nome: "IA Livedo", conversas: 1320, resolucao: "78%", tempoMedio: "6s", satisfacao: "4,4" },
];

export const relatoriosAgendadosSimulados = [
  { nome: "Resumo executivo semanal", frequencia: "Toda segunda", destino: "gestao@livedo.app", status: "Ativo" },
  { nome: "Consumo mensal de IA", frequencia: "Dia 1", destino: "financeiro@livedo.app", status: "Ativo" },
  { nome: "Performance de atendentes", frequencia: "Sexta-feira", destino: "operacao@livedo.app", status: "Pausado" },
];
