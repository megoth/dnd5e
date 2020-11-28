import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";

export default function useDataset(url) {
  const { fetch } = useSession();
  return useSWR([url, "dataset"], () => getSolidDataset(url, { fetch }));
}
