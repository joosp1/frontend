import { ArrowRight } from "lucide-react";
import { LogoLivedo } from "@/componentes/layout/logo-livedo";
import { Botao } from "@/componentes/ui/botao";
import { Card, CardCabecalho, CardConteudo, CardDescricao, CardTitulo } from "@/componentes/ui/card";
import { Input } from "@/componentes/ui/input";

export default function PaginaEntrar() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <LogoLivedo claro={false} />
        <Card>
          <CardCabecalho>
            <CardTitulo>Entrar no painel</CardTitulo>
            <CardDescricao>Acesse sua empresa na Livedo.</CardDescricao>
          </CardCabecalho>
          <CardConteudo className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">E-mail</label>
              <Input id="email" type="email" placeholder="voce@empresa.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="senha">Senha</label>
              <Input id="senha" type="password" placeholder="Sua senha" />
            </div>
            <Botao className="w-full">
              Entrar
              <ArrowRight className="h-4 w-4" />
            </Botao>
          </CardConteudo>
        </Card>
      </div>
    </main>
  );
}
