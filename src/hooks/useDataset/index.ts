import useSWR, { keyInterface } from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import useResourceBundle from "../useResourceBundle";
import { getError } from "../../models/resourceBundle";

export default function useDataset(url, cacheKeys?: keyInterface) {
  const { fetch } = useSession();
  const { data: bundle } = useResourceBundle("global");
  return useSWR([url, "dataset"].concat(cacheKeys), () =>
    getSolidDataset(url, { fetch }).catch((error) => {
      throw getError("datasetLoadFailed", bundle, error);
    })
  );
}
