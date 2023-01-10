import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import initMockAPI from "../mocks";
import { QueryClient, QueryClientProvider } from "react-query";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  initMockAPI();
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
