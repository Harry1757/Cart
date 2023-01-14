import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const inputState = atom({
  key: "inputState",
  default: "",
});
const gradeState = atom({
  key: "gradeList",
  default: [
    "비회원",
    "뉴비",
    "루키",
    "맴버",
    "브론즈",
    "실버",
    "골드",
    "플래티넘",
    "다이아몬드",
  ],
});
export const useGradeList = () => {
  return useRecoilValue(gradeState);
};

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
