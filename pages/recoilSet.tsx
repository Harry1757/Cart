import React from "react";
import { useMessageSave } from "../recoil/global";

export const RecoilSet = () => {
  const { set } = useMessageSave();
  return (
    <div>
      <input onChange={(e) => set(e.target.value)} />
    </div>
  );
};
