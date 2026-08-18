export interface Etiqueta {
  id: string;
  nome: string;
  cor: string;
}

export interface TarefaResumo {
  id: string;
  titulo: string;
  vencimentoEm: Date;
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
  concluida: boolean;
}

export interface Oportunidade {
  id: string;
  idContato: string;
  nomeContato: string;
  nomeEmpresa?: string;
  telefone: string;
  idEtapa: string;
  idResponsavel?: string;
  nomeResponsavel?: string;
  valorEstimado?: number;
  origem?: string;
  etiquetas: Etiqueta[];
  ultimaInteracaoEm?: Date;
  proximaTarefa?: TarefaResumo;
  situacao: "ABERTA" | "GANHA" | "PERDIDA";
}

export interface EtapaFunil {
  id: string;
  nome: string;
  ordem: number;
  cor?: string;
}

export interface Contato {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  empresa?: string;
  origem?: string;
  idResponsavel?: string;
  nomeResponsavel?: string;
  etiquetas: Etiqueta[];
  ultimaInteracaoEm?: Date;
  situacao: "ATIVO" | "INATIVO" | "BLOQUEADO";
}

export interface Tarefa {
  id: string;
  titulo: string;
  idContato?: string;
  nomeContato?: string;
  idOportunidade?: string;
  nomeOportunidade?: string;
  idResponsavel: string;
  nomeResponsavel: string;
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
  vencimentoEm: Date;
  situacao: "PENDENTE" | "CONCLUIDA" | "ATRASADA";
}

export interface MensagemConversa {
  id: string;
  autor: "CLIENTE" | "IA" | "ATENDENTE";
  conteudo: string;
  enviadaEm: Date;
  status: "ENVIADA" | "ENTREGUE" | "LIDA" | "FALHA";
}

export interface Conversa {
  id: string;
  idContato: string;
  nomeContato: string;
  telefone: string;
  canal: "WHATSAPP";
  situacao: "IA_ATIVA" | "HUMANO" | "AGUARDANDO";
  etiquetas: Etiqueta[];
  ultimaMensagem: string;
  ultimaMensagemEm: Date;
  mensagens: MensagemConversa[];
}

export interface IndicadoresCrm {
  oportunidadesAbertas: number;
  valorTotalNegociacao: number;
  oportunidadesGanhas: number;
  taxaConversao: number;
  tarefasAtrasadas: number;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
}

export interface EmpresaCliente {
  id: string;
  nome: string;
  plano: string;
  segmento: string;
}

export interface ConsumoIa {
  plano: string;
  periodo: string;
  limite: number;
  percentualUtilizado: number;
  tokensEntrada: number;
  tokensSaida: number;
  chamadasIa: number;
  mensagensProcessadas: number;
  custoEstimado: number;
  custoPorConversa: number;
}

export interface PontoGrafico {
  nome: string;
  valor: number;
  secundario?: number;
}
