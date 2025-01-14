import useSWR from "swr";
import useApp from "../useApp";
import { useLdo } from "@ldo/solid-react";
import { RulesBundleShapeType } from "../../ldo/app.shapeTypes";

export default function useRulesBundle(...bundles: string[]) {
  const { getResource, getSubject } = useLdo();
  const { app } = useApp();
  return useSWR(
    () => "rulesBundle" + app["@id"] + bundles.join("-"),
    async () =>
      Promise.all(
        (
          await Promise.all(
            app.rulesBundle.map(async (bundle) => {
              await getResource(bundle["@id"]).readIfUnfetched();
              return getSubject(RulesBundleShapeType, bundle["@id"]);
            }),
          )
        )
          .filter(
            (bundle) =>
              bundles.length === 0 || bundles.indexOf(bundle.label) !== -1,
          )
          .flatMap((bundle) => bundle.rulesResource)
          .map(async (resource) =>
            getResource(resource["@id"]).readIfUnfetched(),
          ),
      ),
  );
}
