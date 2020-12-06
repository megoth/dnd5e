import { useContext } from "react";
import { AppContext } from "../../contexts/app";

export default function useApp() {
  return useContext(AppContext);
}
