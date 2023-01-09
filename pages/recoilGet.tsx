import React from "react";
import { useMessageState } from "../recoil/test";

export const RecoilGet = () => {
  const result = useMessageState();
  return <div>get Data {result}</div>;
};
