import { selector } from "recoil";
import { multiChoiceSelectedState } from "../atoms/examFormAtoms";

export const selectedCountState = selector({
  key: 'selectedCountState',
  get: ({get}) => {
    const selected = get(multiChoiceSelectedState);
    const selectedCount = selected.length;
    return selectedCount;
  },
});
