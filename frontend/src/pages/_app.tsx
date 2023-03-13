import client from "@/clients/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </ApolloProvider>
  );
}
