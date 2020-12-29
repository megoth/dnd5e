import { useContext } from "react";
import { LayoutContext } from "../../contexts/layout";

export default function useLayout() {
  return useContext(LayoutContext);
}
