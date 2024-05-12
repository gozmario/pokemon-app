import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components";
import { ThemeProvider } from "@mui/material";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { theme } from "@/styles";

export default function App({
  Component,
  pageProps: { session, dehydratedState, ...rest },
}: AppProps) {
  const queryClientRef = useRef(new QueryClient());

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={dehydratedState}>
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...rest} />
            </Layout>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}
