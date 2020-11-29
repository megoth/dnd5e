import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import { generateErrorUrl } from "../../models/error";

export default function useDataset(url) {
  const { fetch } = useSession();
  return useSWR([url, "dataset"], () =>
    getSolidDataset(url, { fetch }).catch((error) => {
      throw new NestedError(generateErrorUrl("datasetLoadFailed"), error);
    })
  );
}
