import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import useSWR from "swr";
import useProfile from "../useProfile";
import { timedPromise } from "../../utils/promise";

export default function useStorage() {
  const { profile } = useProfile();
  const { getResource, getSubject } = useLdo();

  const {
    data: defaultStorage,
    isLoading: defaultStorageLoading,
    mutate: mutateDefaultStorage,
  } = useSWR(
    () => `storage-${profile?.["@id"]}`,
    async () => {
      if (!profile?.defaultStorage) return timedPromise();
      await getResource(
        resourceUrl(profile.defaultStorage["@id"]),
      ).readIfUnfetched();
      return getSubject(StorageShapeType, profile.defaultStorage["@id"]);
    },
  );

  const {
    data: storages,
    isLoading: storagesLoading,
    mutate: mutateStorages,
  } = useSWR(
    () =>
      `storages-${profile.storages.map((storage) => storage["@id"]).join("-")}`,
    async () => {
      if (!profile?.storages?.length) return timedPromise();
      return Promise.all(
        profile.storages.map(async (storage) => {
          await getResource(resourceUrl(storage["@id"])).readIfUnfetched();
          return getSubject(StorageShapeType, storage["@id"]);
        }),
      );
    },
  );

  return {
    defaultStorage,
    storages,
    isLoading: defaultStorageLoading || storagesLoading,
    mutate: async () => Promise.all([mutateDefaultStorage(), mutateStorages()]),
  };
}
