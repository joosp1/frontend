"use client";

import { CheckCheck, MoreHorizontal, Paperclip, Phone, Send, Smile, Sparkles, UserCheck, Zap } from "lucide-react";
import { Avatar, AvatarFallback } from "@/componentes/ui/avatar";
import { Botao } from "@/componentes/ui/botao";
import { Input } from "@/componentes/ui/input";
import type { Conversa } from "@/tipos/crm";

function iniciais(nome: string) {
  return nome.split(" ").slice(0, 2).map((parte) => parte[0]).join("");
}

export function ChatAtivo({ conversa }: { conversa?: Conversa }) {
  return (
    <main className="flex min-h-[620px] min-w-0 flex-col bg-background xl:min-h-0">
      <div className="flex items-center justify-between border-b bg-card p-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback>{conversa ? iniciais(conversa.nomeContato) : "CT"}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate font-semibold">{conversa?.nomeContato}</p>
              <span className="h-2 w-2 rounded-full bg-success" />
            </div>
            <p className="truncate text-sm text-muted-foreground">WhatsApp · {conversa?.situacao === "HUMANO" ? "Humano" : "IA ativa"}</p>
          </div>
        </div>
        <div className="flex shrink-0 gap-2">
          <Botao variante="contorno"><UserCheck className="h-4 w-4" />{conversa?.situacao === "HUMANO" ? "Em atendimento" : "Assumir"}</Botao>
          <Botao variante="contorno" className="hidden sm:inline-flex"><Phone className="h-4 w-4" />Ligar</Botao>
          <Botao variante="fantasma" tamanho="icone" aria-label="Mais ações"><MoreHorizontal className="h-4 w-4" /></Botao>
        </div>
      </div>

      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top,#EAF1FF_0,#F6F8FB_38%,#F6F8FB_100%)] p-4">
        <div className="mx-auto w-fit rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">Hoje</div>
        {conversa?.mensagens.map((mensagem) => (
          <div key={mensagem.id} className={`flex ${mensagem.autor === "CLIENTE" ? "justify-start" : "justify-end"}`}>
            <div className={`max-w-[78%] rounded-2xl border p-3 text-sm shadow-sm ${mensagem.autor === "CLIENTE" ? "bg-card" : "bg-purple text-white"}`}>
              <p>{mensagem.conteudo}</p>
              <p className={`mt-2 flex items-center gap-1 text-[11px] ${mensagem.autor === "CLIENTE" ? "text-muted-foreground" : "text-white/75"}`}>
                <CheckCheck className="h-3 w-3" /> {mensagem.status.toLowerCase()} · {mensagem.enviadaEm.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
        <div className="max-w-sm rounded-2xl border bg-card p-3 text-sm shadow-sm">
          <div className="flex gap-3">
            <div className="rounded-xl bg-purple-soft p-2 text-purple"><Sparkles className="h-4 w-4" /></div>
            <div>
              <p className="font-medium text-purple">IA ativa</p>
              <p className="text-muted-foreground">Esta conversa está sendo assistida pela IA. Intervenção manual disponível.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 border-t bg-card p-4">
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border bg-card px-3">
          <Input className="border-0 shadow-none focus:ring-0" placeholder="Digite sua mensagem..." />
          <Botao variante="fantasma" tamanho="icone" aria-label="Anexar"><Paperclip className="h-4 w-4" /></Botao>
          <Botao variante="fantasma" tamanho="icone" aria-label="Emoji"><Smile className="h-4 w-4" /></Botao>
          <Botao variante="fantasma" tamanho="icone" aria-label="Ação rápida"><Zap className="h-4 w-4" /></Botao>
        </div>
        <Botao tamanho="icone" aria-label="Enviar mensagem"><Send className="h-4 w-4" /></Botao>
      </div>
    </main>
  );
}
