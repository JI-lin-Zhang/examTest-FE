import { atom } from "recoil";
import { IUserInfo } from "../../interface";

export const userAtomState = atom<IUserInfo[]>({
  key: 'userState',
  default: []
});
