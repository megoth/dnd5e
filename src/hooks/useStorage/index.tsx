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
  const { getResource, getSubject, changeData, commitData, createData } =
    useLdo();
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
    () => `storage-${profile?.["@id"]}-${profile?.defaultStorage?.["@id"]}`,
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

  const isLoading =
    loadingLocalData || defaultStorageLoading || storagesLoading;

  const mutate = async () =>
    Promise.all([mutateDefaultStorage(), mutateStorages()]);

  const remove = async function <T extends LdoBase>(subject: T): Promise<void> {
    const hasOnlineStorage = resourceUrl(subject["@id"]) !== "";
    if (!defaultStorage || !hasOnlineStorage) {
      dataset.deleteMatches(namedNode(subject["@id"])); // TODO: remove leafs
      localStorage.removeItem(`local_${subject["@id"]}`);
      return;
    }
    const storageResource = getResource(resourceUrl(defaultStorage["@id"]));
    await storageResource.readIfUnfetched();
    const updatedSubject = changeData(subject, storageResource);
    delete updatedSubject["@id"];
    await commitData(updatedSubject);
    return Promise.resolve();
  };

  const store = async function <T extends LdoBase>(
    shapeType: ShapeType<T>,
    subjectId: string,
    populateFn: (subject: T) => T,
  ): Promise<T> {
    const newSubject = createLdoDataset()
      .usingType(shapeType)
      .fromSubject(subjectId);
    if (!defaultStorage) {
      const localSubject = populateFn(newSubject);
      localStorage.setItem(`local_${subjectId}`, await toTurtle(localSubject));
      return localSubject;
    }
    const defaultResourceUrl = resourceUrl(defaultStorage["@id"]);
    const storageResource = getResource(defaultResourceUrl);
    await storageResource.readIfUnfetched();
    const hasOnlineStorage = resourceUrl(subjectId) !== "";
    const id = hasOnlineStorage ? subjectId : defaultResourceUrl + subjectId;
    const oldSubject =
      getSubject(shapeType, id) || createData(shapeType, id, storageResource);
    const updatedSubject = populateFn(changeData(oldSubject, storageResource));
    await commitData(updatedSubject);
    return Promise.resolve(updatedSubject);
  };

  return {
    defaultStorage,
    storages,
    isLoading,
    mutate,
    remove,
    store,
  };
}
