import useSWR from "swr";
import useApp from "../useApp";
import { useLdo } from "@ldo/solid-react";
import { RulesBundleShapeType } from "../../ldo/app.shapeTypes";

export default function useRulesBundle(...rules: ["classes"]) {
  const { getResource, getSubject } = useLdo();
  const { app } = useApp();
  return useSWR(
    () => "rulesBundle" + app["@id"] + rules.join("-"),
    async () =>
      Promise.all(
        (
          await Promise.all(
            app.rulesBundle.map(async (set) => {
              await getResource(set["@id"]).readIfUnfetched();
              return getSubject(RulesBundleShapeType, set["@id"]);
            }),
          )
        )
          .flatMap((set) => set.rulesResource)
          .map(async (resource) =>
            getResource(resource["@id"]).readIfUnfetched(),
          ),
      ),
  );
}
