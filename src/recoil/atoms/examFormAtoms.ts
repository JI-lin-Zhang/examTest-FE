import { atom } from "recoil";
import { IMultipleChoiceProps, IMultiChoiceSelected } from "../../interface";

export const multiChoiceSelectedState = atom<IMultiChoiceSelected[]>({
  key: "multiChoiceSelectedState",
  default: [],
});

export const multiChoiceExamManageState = atom<IMultipleChoiceProps[]>({
  key: "multiChoiceExamManageState",
  default: [],
});
