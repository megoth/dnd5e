import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export default function useMergeQuery() {
  const [searchParams] = useSearchParams();
  return useCallback(
    (query: Record<string, string | string[]>): string => {
      const queries = searchParams.entries().reduce(
        (params, [key, value]) => ({
          ...params,
          [key]: value,
        }),
        {} as Record<string, Array<string>>,
      );
      return `?${Object.entries({
        ...queries,
        ...query,
      })
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
    },
    [searchParams],
  );
}
