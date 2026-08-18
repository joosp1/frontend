import {
  etapasFunilSimuladas,
  indicadoresCrmSimulados,
  oportunidadesSimuladas,
} from "@/dados-simulados/crm";
import type { EtapaFunil, IndicadoresCrm, Oportunidade } from "@/tipos/crm";

let oportunidadesEmMemoria = [...oportunidadesSimuladas];

const aguardar = (tempo = 180) => new Promise((resolve) => setTimeout(resolve, tempo));

export const servicoDeOportunidades = {
  async buscarEtapas(): Promise<EtapaFunil[]> {
    await aguardar();
    return etapasFunilSimuladas;
  },

  async buscarOportunidades(): Promise<Oportunidade[]> {
    await aguardar();
    return oportunidadesEmMemoria;
  },

  async buscarIndicadores(): Promise<IndicadoresCrm> {
    await aguardar();
    const oportunidadesAbertas = oportunidadesEmMemoria.filter(
      (oportunidade) => oportunidade.situacao === "ABERTA",
    ).length;
    const valorTotalNegociacao = oportunidadesEmMemoria
      .filter((oportunidade) => oportunidade.situacao === "ABERTA")
      .reduce((total, oportunidade) => total + (oportunidade.valorEstimado ?? 0), 0);

    return {
      ...indicadoresCrmSimulados,
      oportunidadesAbertas,
      valorTotalNegociacao,
    };
  },

  async moverOportunidade(idOportunidade: string, idEtapaDestino: string): Promise<Oportunidade> {
    await aguardar(120);
    const oportunidade = oportunidadesEmMemoria.find((item) => item.id === idOportunidade);

    if (!oportunidade) {
      throw new Error("Oportunidade não encontrada");
    }

    const situacao =
      idEtapaDestino === "convertido" ? "GANHA" : idEtapaDestino === "perdido" ? "PERDIDA" : "ABERTA";

    const oportunidadeAtualizada: Oportunidade = {
      ...oportunidade,
      idEtapa: idEtapaDestino,
      situacao,
      ultimaInteracaoEm: new Date(),
    };

    oportunidadesEmMemoria = oportunidadesEmMemoria.map((item) =>
      item.id === idOportunidade ? oportunidadeAtualizada : item,
    );

    return oportunidadeAtualizada;
  },
};
