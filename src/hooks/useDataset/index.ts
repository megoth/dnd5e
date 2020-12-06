import useSWR, { ConfigInterface, keyInterface } from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import useApp from "../useApp";
import { getError } from "../../models/error";

export default function useDataset(
  url,
  cacheKeys?: keyInterface,
  config?: ConfigInterface
) {
  const { fetch } = useSession();
  const { app } = useApp();
  return useSWR(
    [url, "dataset"].concat(cacheKeys),
    async () =>
      url
        ? getSolidDataset(url, { fetch }).catch((error) => {
            throw app
              ? getError("datasetLoadFailed", app, error)
              : new NestedError("Failed to load dataset", error);
          })
        : null,
    config
  );
}
