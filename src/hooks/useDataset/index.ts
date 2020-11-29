import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import NestedError from "nested-error-stacks";
import { generateErrorUrl } from "../../models/error";
import { useAppConfig } from "../../contexts/appConfig";

export default function useDataset(url) {
  const { fetch } = useSession();
  const { errorsUrl } = useAppConfig();
  return useSWR([url, "dataset"], () =>
    getSolidDataset(url, { fetch }).catch((error) => {
      throw new NestedError(
        generateErrorUrl("datasetLoadFailed", errorsUrl),
        error
      );
    })
  );
}
