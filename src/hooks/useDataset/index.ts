import useSWR, { ConfigInterface, keyInterface } from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import useResourceBundle from "../useResourceBundle";
import { getError } from "../../models/error";

export default function useDataset(
  url,
  cacheKeys?: keyInterface,
  config?: ConfigInterface
) {
  const { fetch } = useSession();
  const { resourceBundle } = useResourceBundle();
  return useSWR(
    [url, "dataset"].concat(cacheKeys),
    async () =>
      url
        ? getSolidDataset(url, { fetch }).catch((error) => {
            throw resourceBundle
              ? getError("datasetLoadFailed", resourceBundle, error)
              : new NestedError("Failed to load dataset", error);
          })
        : null,
    config
  );
}
