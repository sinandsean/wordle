import { atom } from "recoil";

export const inputWordState = atom<string[][]>({
  key: "inputWord",
  default: [],
});
