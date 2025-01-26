import type { LdoBase, ShapeType } from "@ldo/ldo";
import { useLdo } from "@ldo/solid-react";
import useRulesBundle from "../useRulesBundle";
import { useMemo } from "react";
import { namedNode } from "@rdfjs/data-model";
import { vocabUrl } from "../../utils/dnd5e";

export default function useListOfType<Type extends LdoBase>(
  shapeType: ShapeType<Type>,
  rulesBundle: string,
  type: string,
): {
  isLoading: boolean;
  items: Array<Type>;
} {
  const { dataset, getSubject } = useLdo();
  const { isLoading } = useRulesBundle(rulesBundle);

  return useMemo(() => {
    if (!dataset || isLoading) return { items: [], isLoading };
    const matchesOnType = dataset.match(null, null, namedNode(vocabUrl(type)));
    console.log("matchesOnType", vocabUrl(type), matchesOnType.size);
    return {
      isLoading,
      items: matchesOnType
        .toArray()
        .map((quad) => getSubject(shapeType, quad.subject.value)),
    };
  }, [dataset, isLoading]);
}
