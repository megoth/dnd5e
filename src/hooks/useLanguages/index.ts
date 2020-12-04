/* istanbul ignore file */
import { useEffect, useState } from "react";

export default function useLanguages() {
  const [languages, setLanguages] = useState<string[]>();
  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }
    setLanguages([...navigator.languages]);
  }, []);
  return languages;
}
