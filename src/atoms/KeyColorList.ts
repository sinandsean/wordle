import { atom } from "recoil";

export interface KeyColor {
  key: string;
  color: string;
}

export const keyColorListState = atom<KeyColor[]>({
  key: "keyColorList",
  default: [],
});
