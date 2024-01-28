import "@/styles/globals.css";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";

import { cn } from "@/lib/utils";
import UserProvider from "@/providers/UserProvider";
import { fontSpoqaHanSansNeo } from "@/styles/fonts";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <UserProvider>
          <main
            className={cn(
              "min-h-screen bg-background font-spoqa antialiased",
              fontSpoqaHanSansNeo.variable,
            )}
          >
            <Component {...pageProps} />
          </main>
        </UserProvider>
      </HydrationBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
