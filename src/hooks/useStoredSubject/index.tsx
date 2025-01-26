import { useParams } from "react-router-dom";
import { useLdo } from "@ldo/solid-react";
import useSWR from "swr";
import { resourceUrl } from "../../utils/url";
import useStorage from "../useStorage";
import { LdoBase, ShapeType } from "@ldo/ldo";

export default function useStoredSubject<T extends LdoBase>(
  shapeType: ShapeType<T>,
) {
  const params = useParams();
  const url = atob(params.url);
  const { getResource, getSubject } = useLdo();

  const { isLoading: isStorageLoading } = useStorage();

  const {
    data: subject,
    isLoading: isSubjectLoading,
    ...rest
  } = useSWR(
    () => url,
    async () => {
      const resource = resourceUrl(url);
      if (resource) {
        await getResource(resource).readIfUnfetched();
      }
      return getSubject(shapeType, url);
    },
  );

  return {
    subject,
    isLoading: isStorageLoading || isSubjectLoading,
    isLocal: subject?.["@id"] && !resourceUrl(subject["@id"]),
    isSubjectLoading,
    isStorageLoading,
    ...rest,
  };
}
