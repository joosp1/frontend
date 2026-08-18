import type { EmpresaCliente, Usuario } from "@/tipos/crm";

export const empresasSimuladas: EmpresaCliente[] = [
  {
    id: "empresa-1",
    nome: "Livedo Demo",
    plano: "Profissional",
    segmento: "Atendimento via WhatsApp",
  },
  {
    id: "empresa-2",
    nome: "Clínica Aurora",
    plano: "Essencial",
    segmento: "Clínica",
  },
];

export const usuariosSimulados: Usuario[] = [
  {
    id: "usuario-1",
    nome: "Marina Costa",
    email: "marina@livedo.app",
    cargo: "Gestora de atendimento",
  },
  {
    id: "usuario-2",
    nome: "Rafael Lima",
    email: "rafael@livedo.app",
    cargo: "Consultor comercial",
  },
  {
    id: "usuario-3",
    nome: "Bianca Souza",
    email: "bianca@livedo.app",
    cargo: "Atendente",
  },
];
