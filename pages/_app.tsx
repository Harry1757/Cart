import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import initMockAPI from "../mocks";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  initMockAPI();
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
