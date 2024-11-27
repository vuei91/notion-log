import { atom } from "recoil";

const pageNumAtom = atom({
  key: "pageNumAtom",
  default: 1,
});

export default pageNumAtom;
