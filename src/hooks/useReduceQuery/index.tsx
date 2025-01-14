import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useReduceQuery() {
  const [searchParams] = useSearchParams();
  return useCallback(
    (...keys: string[]) => {
      const queries = searchParams.entries().reduce(
        (params, [key, value]) =>
          keys.indexOf(key) === -1
            ? {
                ...params,
                [key]: value,
              }
            : params,
        {} as Record<string, Array<string>>,
      );
      return `?${Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
    },
    [searchParams],
  );
}
