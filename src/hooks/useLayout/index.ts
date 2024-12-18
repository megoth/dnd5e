import { useContext } from "react";
import LayoutContext from "./context";

export default function useLayout() {
  return useContext(LayoutContext);
}
