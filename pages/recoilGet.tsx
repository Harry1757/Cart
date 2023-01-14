import React from "react";
import { useMessageState } from "../recoil/global";

export const RecoilGet = () => {
  const result = useMessageState();
  return <div>get Data {result}</div>;
};
