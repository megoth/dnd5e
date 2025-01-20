import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import useSWR from "swr";
import useProfile from "../useProfile";

export default function useStorage() {
  const { profile } = useProfile();
  const { getResource, getSubject } = useLdo();

  const { data: defaultStorage, isLoading: defaultStorageLoading } = useSWR(
    () => `storage-${profile?.["@id"]}`,
    async () => {
      if (!profile?.defaultStorage) return;
      await getResource(
        resourceUrl(profile.defaultStorage["@id"]),
      ).readIfUnfetched();
      return getSubject(StorageShapeType, profile.defaultStorage["@id"]);
    },
  );

  const { data: storages, isLoading: storagesLoading } = useSWR(
    () =>
      `storages-${profile.storages.map((storage) => storage["@id"]).join("-")}`,
    async () => {
      if (!profile?.storages?.length) return;
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
  };
}
