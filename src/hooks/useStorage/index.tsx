import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import useSWR from "swr";
import useProfile from "../useProfile";
import { timedPromise } from "../../utils/promise";
import {
  createLdoDataset,
  LdoBase,
  parseRdf,
  type ShapeType,
  toTurtle,
} from "@ldo/ldo";
import { useEffect, useState } from "react";
import { namedNode, quad } from "@rdfjs/data-model";
import { rdf } from "rdf-namespaces";
import { shapeMap } from "../../utils/dnd5e";
import { first } from "../../utils/array";

export default function useStorage() {
  const { dataset } = useLdo();
  const { profile } = useProfile();
  const { getResource, getSubject } = useLdo();
  const [loadingLocalData, setLoadingLocalData] = useState<boolean>(true);

  useEffect(() => {
    Promise.all(
      Object.entries(localStorage)
        .filter(([key]) => key.startsWith("local_"))
        .map(async ([key, value]) => {
          const id = key.slice(7);
          if (
            dataset.has(quad(namedNode(id), namedNode(rdf.type), null, null))
          ) {
            return;
          }
          const localDataset = await parseRdf(value);
          const type = first(
            localDataset
              .match(null, namedNode(rdf.type), null, null)
              .toArray()
              .map((match) => match.object.value),
          );
          const shapeType = shapeMap[type];
          if (!type || !shapeType) return;
          const localEntity = localDataset
            .usingType(shapeType)
            .fromSubject(`#${id}`);
          dataset.usingType(shapeType).fromJson(localEntity);
        }),
    ).then(() => setLoadingLocalData(false));
  }, [localStorage]);

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
    isLoading: loadingLocalData || defaultStorageLoading || storagesLoading,
    mutate: async () => Promise.all([mutateDefaultStorage(), mutateStorages()]),
    store: async function <T extends LdoBase>(
      subject: T,
      shapeType: ShapeType<T>,
    ): Promise<T> {
      if (!defaultStorage) {
        const localSubject = createLdoDataset()
          .usingType(shapeType)
          .fromJson(subject);
        localStorage.setItem(
          `local_${subject["@id"]}`,
          await toTurtle(localSubject),
        );
        return localSubject;
      }
      // TODO: ONLINE STORAGE
      return new Promise((resolve) => resolve(subject));
    },
  };
}
