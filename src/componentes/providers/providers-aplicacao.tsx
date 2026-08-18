"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ProvidersAplicacao({ children }: { children: React.ReactNode }) {
  const [clienteConsulta] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={clienteConsulta}>{children}</QueryClientProvider>;
}
