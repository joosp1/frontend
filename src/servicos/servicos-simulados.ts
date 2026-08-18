import {
  contatosSimulados,
  consumoPorDiaSimulado,
  consumoSimulado,
  conversasPorDiaSimuladas,
  conversasSimuladas,
  oportunidadesPorEtapaSimuladas,
  tarefasSimuladas,
} from "@/dados-simulados/crm";
import { empresasSimuladas, usuariosSimulados } from "@/dados-simulados/empresas";
import {
  consumoIaCategoriaRelatorio,
  evolucaoConversasRelatorio,
  funilOportunidadesRelatorio,
  relatoriosAgendadosSimulados,
  tempoRespostaRelatorio,
  topAtendentesRelatorio,
} from "@/dados-simulados/relatorios";

const aguardar = (tempo = 160) => new Promise((resolve) => setTimeout(resolve, tempo));

export const servicoDeContatos = {
  async buscarContatos() {
    await aguardar();
    return contatosSimulados;
  },
};

export const servicoDeTarefas = {
  async buscarTarefas() {
    await aguardar();
    return tarefasSimuladas;
  },
};

export const servicoDeConversas = {
  async buscarConversas() {
    await aguardar();
    return conversasSimuladas;
  },
};

export const servicoDeConsumo = {
  async buscarConsumo() {
    await aguardar();
    return consumoSimulado;
  },
};

export const servicoDePainel = {
  async buscarResumo() {
    await aguardar();
    return {
      conversasHoje: 184,
      novosContatos: 37,
      oportunidadesAbertas: 24,
      oportunidadesGanhas: 12,
      valorEmNegociacao: 19000,
      tarefasAtrasadas: 3,
      consumoIa: 0.62,
      taxaRespostaIa: 0.87,
      transferenciasHumano: 18,
      oportunidadesPorEtapa: oportunidadesPorEtapaSimuladas,
      conversasPorDia: conversasPorDiaSimuladas,
      conversaoPorPeriodo: [
        { nome: "Mai", valor: 0.22 },
        { nome: "Jun", valor: 0.27 },
        { nome: "Jul", valor: 0.29 },
        { nome: "Ago", valor: 0.31 },
      ],
      consumoPorDia: consumoPorDiaSimulado,
    };
  },
};

export const servicoDeSessao = {
  async buscarContexto() {
    await aguardar(80);
    return {
      empresaAtual: empresasSimuladas[0],
      empresas: empresasSimuladas,
      usuarioAtual: usuariosSimulados[0],
    };
  },
};

export const servicoDeRelatorios = {
  async buscarRelatorios() {
    await aguardar();
    return {
      metricas: {
        conversas: 3908,
        oportunidades: 125,
        conversao: 0.31,
        custoIa: 1240,
      },
      evolucaoConversas: evolucaoConversasRelatorio,
      funilOportunidades: funilOportunidadesRelatorio,
      consumoIaCategoria: consumoIaCategoriaRelatorio,
      tempoResposta: tempoRespostaRelatorio,
      topAtendentes: topAtendentesRelatorio,
      relatoriosAgendados: relatoriosAgendadosSimulados,
    };
  },
};
