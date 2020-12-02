import useSWR from "swr";
import { getSolidDataset } from "@inrupt/solid-client";
import { createLocalResponse, getPath } from "../../utils";
import appIndexTurtle from "../../../public/data/index.ttl";
import useAppConfig from "../useAppConfig";

export default function useAppIndex() {
  const { solidBase } = useAppConfig();
  const solidBaseUrl = getPath(solidBase);
  return useSWR("appIndex", () =>
    getSolidDataset(solidBaseUrl, {
      fetch: () => Promise.resolve(createLocalResponse(appIndexTurtle)),
    })
  );
}
