import React from "react";
import { useMessageSave } from "../recoil/test";

export const RecoilSet = () => {
  const { set } = useMessageSave();
  return (
    <div>
      <input onChange={(e) => set(e.target.value)} />
    </div>
  );
};
