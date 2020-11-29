import useSWR from "swr";
import { getResourceInfo } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import useErrorMethods from "../useErrorMethods";
import { ResourceInfoSWR } from "../../models/solidClient";

interface Options {
  onError: (error: Error & { statusCode: number }) => Error;
}

export default function useResourceInfo(
  url,
  { onError }: Partial<Options> = {}
): ResourceInfoSWR {
  const { fetch } = useSession();
  const { getErrorUrl } = useErrorMethods();
  return useSWR(
    [url, "resourceInfo", fetch],
    () =>
      getResourceInfo(url, { fetch }).catch((error) => {
        if (onError) {
          throw onError(error);
        }
        throw new NestedError(getErrorUrl("resourceInfoLoadFailed"), error);
      }),
    {
      errorRetryCount: 0,
    }
  );
}
