import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ProvidersAplicacao } from "@/componentes/providers/providers-aplicacao";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Livedo CRM",
  description: "Painel SaaS multiempresa da Livedo",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <ProvidersAplicacao>{children}</ProvidersAplicacao>
      </body>
    </html>
  );
}
