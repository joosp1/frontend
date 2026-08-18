import {
  Bell,
  Building2,
  CalendarDays,
  Clock3,
  KeyRound,
  Link2,
  Mail,
  Palette,
  Plug,
  Shield,
  SlidersHorizontal,
  Smartphone,
  Users,
} from "lucide-react";
import { CardDeConfiguracao } from "@/componentes/configuracoes/card-de-configuracao";

const secoes = [
  {
    titulo: "Empresa",
    descricao: "Dados cadastrais, marca e unidades.",
    icone: Building2,
    tom: "azul" as const,
    acao: "Editar dados",
    itens: [
      { rotulo: "Empresa", valor: "Livedo Demo", situacao: "Ativa" as const, icone: Users },
      { rotulo: "Unidades", valor: "2 unidades cadastradas", icone: Building2 },
      { rotulo: "Documento", valor: "CNPJ 12.345.678/0001-90", icone: KeyRound },
    ],
  },
  {
    titulo: "Usuários",
    descricao: "Equipe, perfis e permissões.",
    icone: Users,
    tom: "roxo" as const,
    acao: "Perfis e permissões",
    itens: [
      { rotulo: "Ativos", valor: "23 usuários ativos", icone: Users },
      { rotulo: "Perfis", valor: "5 perfis de acesso", icone: Shield },
      { rotulo: "Acesso", valor: "Último acesso: hoje, 09:21", icone: Clock3 },
    ],
  },
  {
    titulo: "Segurança",
    descricao: "Sessões, autenticação e auditoria.",
    icone: Shield,
    tom: "azul" as const,
    acao: "Autenticação",
    itens: [
      { rotulo: "2FA", valor: "2FA obrigatório", situacao: "Ativo" as const, icone: Users },
      { rotulo: "Sessões", valor: "3 sessões ativas", icone: KeyRound },
      { rotulo: "Login", valor: "Último login: hoje, 08:47", icone: Clock3 },
    ],
  },
  {
    titulo: "Preferências",
    descricao: "Canais, notificações e aparência.",
    icone: SlidersHorizontal,
    tom: "roxo" as const,
    acao: "Canais e alertas",
    itens: [
      { rotulo: "WhatsApp", valor: "WhatsApp conectado", icone: Smartphone },
      { rotulo: "Idioma", valor: "Idioma: Português (BR)", icone: Shield },
      { rotulo: "Fuso", valor: "Fuso horário: GMT-03:00", icone: Clock3 },
    ],
  },
  {
    titulo: "Integrações",
    descricao: "Conecte ferramentas e automatize.",
    icone: Link2,
    tom: "ciano" as const,
    acao: "Gerenciar integrações",
    itens: [
      { rotulo: "WhatsApp", valor: "WhatsApp Business", situacao: "Conectado" as const, icone: Smartphone },
      { rotulo: "Agenda", valor: "Google Calendar", situacao: "Disponível" as const, icone: CalendarDays },
      { rotulo: "API", valor: "API", situacao: "Disponível" as const, icone: Plug },
    ],
  },
  {
    titulo: "Notificações",
    descricao: "Defina como e quando receber alertas.",
    icone: Bell,
    tom: "amarelo" as const,
    acao: "Gerenciar notificações",
    itens: [
      { rotulo: "E-mail", valor: "E-mail", situacao: "Ativo" as const, icone: Mail },
      { rotulo: "App", valor: "App/Web", situacao: "Ativo" as const, icone: Bell },
      { rotulo: "WhatsApp", valor: "WhatsApp", situacao: "Inativo" as const, icone: Smartphone },
    ],
  },
  {
    titulo: "Aparência",
    descricao: "Personalize o visual da plataforma.",
    icone: Palette,
    tom: "roxo" as const,
    acao: "Personalizar aparência",
    itens: [
      { rotulo: "Tema", valor: "Tema: Claro", icone: Palette },
      { rotulo: "Cor", valor: "Cor primária: Livedo", icone: SlidersHorizontal },
      { rotulo: "Densidade", valor: "Densidade: Confortável", icone: SlidersHorizontal },
    ],
  },
];

export default function PaginaConfiguracoes() {
  return (
    <div className="space-y-3">
      <div className="min-w-0">
        <h1 className="truncate text-2xl font-[700]">Configurações</h1>
        <p className="truncate text-sm text-muted-foreground">Gerencie sua conta, equipe, segurança e preferências da plataforma.</p>
      </div>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {secoes.map((secao) => (
          <CardDeConfiguracao key={secao.titulo} {...secao} />
        ))}
      </section>
    </div>
  );
}
