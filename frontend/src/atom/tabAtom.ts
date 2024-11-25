import { Tab } from "@/constants";
import { atom } from "recoil";

const tabState = atom({
  key: "tabState",
  default: Tab.RECOMMAND,
});

export default tabState;
