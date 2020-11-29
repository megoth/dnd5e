import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import useErrorMethods from "../useErrorMethods";

export default function useDataset(url) {
  const { fetch } = useSession();
  const { getErrorUrl } = useErrorMethods();
  return useSWR([url, "dataset"], () =>
    getSolidDataset(url, { fetch }).catch((error) => {
      throw new NestedError(getErrorUrl("datasetLoadFailed"), error);
    })
  );
}
