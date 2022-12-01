import { atom } from "recoil";
import { IMultipleChoiceProps, ISubmitExamPerson, IUserInfo } from "../../interface";

export const submitExamPersonAtomState = atom<ISubmitExamPerson[]>({
  key: 'submitExamPersonState',
  default: []
});

export const rankAtomState = atom<IUserInfo[]>({
  key: 'rankAtomState',
  default: []
});

export const questionAtomState = atom<IMultipleChoiceProps[]>({
  key: 'questionState',
  default: []
})