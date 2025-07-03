"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type * as React from "react";

export default function QueryProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
