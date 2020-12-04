import { useContext } from "react";
import { ResourceBundleContext } from "../../contexts/resourceBundle";

export default function useResourceBundle() {
  return useContext(ResourceBundleContext);
}
