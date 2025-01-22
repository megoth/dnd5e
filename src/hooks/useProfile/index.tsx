import { useLdo, useSolidAuth } from "@ldo/solid-react";
import { resourceUrl } from "../../utils/url";
import { SolidProfileShapeType } from "../../ldo/dnd5e.shapeTypes";
import useSWR from "swr";
import { timedPromise } from "../../utils/promise";

export default function useProfile() {
  const { session } = useSolidAuth();
  const { getResource, getSubject } = useLdo();

  const { data: profile, ...rest } = useSWR(
    () => `profile-${session.webId}`,
    async () => {
      if (!session.webId) return null;
      await getResource(resourceUrl(session.webId)).readIfUnfetched();
      return getSubject(SolidProfileShapeType, session.webId);
    },
  );

  return { profile, ...rest };
}
