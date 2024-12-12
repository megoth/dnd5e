import { createContext } from "react";

export type SetBooleanValue = (menuOpen: boolean) => void;

const LayoutContext = createContext<{
  full: boolean;
  leftOpen: boolean;
  rightOpen: boolean;
  setFull: SetBooleanValue;
  setLeftOpen: SetBooleanValue;
  setRightOpen: SetBooleanValue;
}>({
  full: false,
  leftOpen: false,
  rightOpen: false,
  setLeftOpen: () => {},
  setFull: () => {},
  setRightOpen: () => {},
});

export default LayoutContext;
