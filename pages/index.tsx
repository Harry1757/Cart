import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import { RecoilSet } from "./recoilSet";
import { RecoilGet } from "./recoilGet";
import { worker } from "../mocks/browser";
import { server } from "../mocks/server";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <RecoilGet />
      <hr />
      <RecoilSet />
    </>
  );
}
