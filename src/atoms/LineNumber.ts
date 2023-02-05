import { atom } from "recoil";

export const lineNumberState = atom<number>({
  key: "lineNumber",
  default: 0,
});
