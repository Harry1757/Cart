import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const inputState = atom({
  key: "inputState",
  default: "",
});

export const useMessageState = () => {
  return useRecoilValue(inputState);
};

export const useMessageSave = () => {
  const setMessage = useSetRecoilState(inputState);
  const set = (value: string) => {
    setMessage(value);
  };
  return {
    set,
  };
};
