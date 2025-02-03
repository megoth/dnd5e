import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import useStorage from "../useStorage";
import { LdoBase, ShapeType } from "@ldo/ldo";
import { useMemo } from "react";
import { isLocal } from "../../utils/dnd5e";

export default function useStoredSubject<T extends LdoBase>(
  shapeType: ShapeType<T>,
) {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { isLoading: isStorageLoading, defaultStorage, remove } = useStorage();

  const {
    data: subject,
    isLoading: isSubjectLoading,
    ...rest
  } = useSWR(
    () => url,
    async () => {
      const rUrl = resourceUrl(url);
      if (rUrl) {
        await getResource(rUrl).readIfUnfetched();
      }
      return getSubject(shapeType, url);
    },
  );

  const isLoading = isStorageLoading || isSubjectLoading;

  const canEdit = useMemo(() => {
    if (isLoading) return false;
    const rUrl = resourceUrl(url);
    return (
      rUrl === "" || // local data
      (defaultStorage && rUrl.startsWith(resourceUrl(defaultStorage["@id"])))
    );
  }, [isLoading, url, defaultStorage]);

  return {
    canEdit,
    isLoading,
    isLocal: isLocal(subject),
    isSubjectLoading,
    isStorageLoading,
    remove: () => remove(subject),
    subject,
    ...rest,
  };
}
