import { useContext } from "react";
import AppContext from "./context";

export default function useApp() {
  return useContext(AppContext);
}
