import { useContext } from "react";
import { AppConfigContext } from "../../contexts/appConfig";

export default function useAppConfig() {
  return useContext(AppConfigContext);
}
