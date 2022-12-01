import { atom } from "recoil";
import { IRegisterFormProps } from "../../interface";

export const basicInfoState = atom<IRegisterFormProps>({
  key: 'basicInfoState',
  default: {
    username: '',
    phone: '',
    email: '',
  },
});

export const userScore = atom<number>({
  key: 'userScore',
  default: 0
});
