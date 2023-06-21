import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import NextNProgress from "nextjs-progressbar";
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <NextNProgress color="#4bb0b2" options={{ showSpinner: false }} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
