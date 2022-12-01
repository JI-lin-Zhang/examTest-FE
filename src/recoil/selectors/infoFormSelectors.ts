import { selector } from "recoil";
import { basicInfoState } from "../atoms/infoFormAtoms";

export const usernameState = selector({
  key: 'usernameState',
  get: ({get}) => {
    const info = get(basicInfoState);
    return info.username;
  },
});
