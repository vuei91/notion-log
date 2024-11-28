import { Tab } from "@/constants";
import { atom } from "recoil";

const tabAtom = atom({
  key: "tabAtom",
  default: Tab.RECOMMAND,
});

export default tabAtom;
