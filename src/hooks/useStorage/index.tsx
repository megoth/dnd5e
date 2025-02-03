import { useLdo } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { StorageShapeType } from "../../ldo/dnd5e.shapeTypes";
import useSWR from "swr";
import useProfile from "../useProfile";
import { timedPromise } from "../../utils/promise";
import {
  createLdoDataset,
  LdoBase,
  LdoDataset,
  parseRdf,
  type ShapeType,
  toTurtle,
} from "@ldo/ldo";
import { useEffect, useState } from "react";
import { namedNode, quad } from "@rdfjs/data-model";
import { rdf } from "rdf-namespaces";
import { isLocal, shapeMap } from "../../utils/dnd5e";
import { first } from "../../utils/array";

function getType(id: string | null, dataset: LdoDataset) {
  return first(
    dataset
      .match(id ? namedNode(id) : null, namedNode(rdf.type), null, null)
      .toArray()
      .map((match) => match.object.value),
  );
}

export default function useStorage() {
  const { dataset } = useLdo();
  const { profile } = useProfile();
  const { getResource, getSubject, changeData, commitData, createData } =
    useLdo();
  const [loadingLocalData, setLoadingLocalData] = useState<boolean>(true);

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

  const removeLocal = function <T extends LdoBase>(subject: T): void {
    dataset.deleteMatches(namedNode(subject["@id"]));
    delete subject["@id"];
    localStorage.removeItem(`local_${subject["@id"]}`);
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
    const id = isLocal({ "@id": subjectId })
      ? defaultResourceUrl + subjectId
      : subjectId;
    const oldSubject =
      getSubject(shapeType, id) || createData(shapeType, id, storageResource);
    const updatedSubject = populateFn(changeData(oldSubject, storageResource));
    await commitData(updatedSubject);
    return Promise.resolve(updatedSubject);
  };

  useEffect(() => {
    Promise.all(
      Object.entries(localStorage)
        .filter(([key]) => key.startsWith("local_"))
        .map(async ([key, value]): Promise<void> => {
          const id = key.slice(6);
          const type = getType(id.slice(1), dataset);
          if (type) {
            return; // entity is already added
          }
          const localDataset = await parseRdf(value);
          const localType = getType(null, localDataset);
          const shapeType = shapeMap[localType];
          if (!localType || !shapeType) {
            return; // need to know which type to create
          }
          const localEntity = localDataset.usingType(shapeType).fromSubject(id);
          if (!defaultStorage) {
            dataset.usingType(shapeType).fromJson(localEntity);
            return; // unable to sync to online storage, so end here
          }
          // TODO: Does this work for more complex objects?
          await store(shapeType, localEntity["@id"], (entity) =>
            Object.entries(localEntity).reduce((memo, [key, value]) => {
              memo[key] = value;
              return memo;
            }, entity),
          );
          dataset.match(namedNode(localEntity["@id"])).forEach((oldQuad) => {
            // updating old data
            dataset.delete(oldQuad);
            dataset.add(
              quad(
                namedNode(
                  resourceUrl(defaultStorage["@id"]) + localEntity["@id"],
                ),
                oldQuad.predicate,
                oldQuad.object,
              ),
            );
          });
          removeLocal(localEntity); // remove local entity from local dataset and storage
        }),
    ).then(() => setLoadingLocalData(false));
  }, [localStorage, defaultStorage]);

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

  // useEffect(() => {
  //   storages;
  // }, []);

  const isLoading =
    loadingLocalData || defaultStorageLoading || storagesLoading;

  const mutate = async () =>
    Promise.all([mutateDefaultStorage(), mutateStorages()]);

  const remove = async function <T extends LdoBase>(subject: T): Promise<void> {
    if (isLocal(subject)) {
      return removeLocal(subject);
    }
    const storageResource = getResource(resourceUrl(defaultStorage["@id"]));
    await storageResource.readIfUnfetched();
    const updatedSubject = changeData(subject, storageResource);
    delete updatedSubject["@id"];
    await commitData(updatedSubject);
  };

  return {
    defaultStorage,
    storages,
    isLoading,
    mutate,
    remove,
    removeLocal,
    store,
  };
}
