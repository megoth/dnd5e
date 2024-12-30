import type { LdoBase, ShapeType } from "@ldo/ldo";
import { useLdo } from "@ldo/solid-react";
import useRulesBundle from "../useRulesBundle";
import { useMemo } from "react";
import { namedNode } from "@rdfjs/data-model";
import { vocabUrl } from "../../utils/dnd5e";
import { ClassShapeType } from "../../ldo/dnd5e.shapeTypes";

export default function useListOfType<Type extends LdoBase>(
  shapeType: ShapeType<Type>,
): {
  isLoading: boolean;
  items?: Array<Type>;
} {
  const [rulesBundle, type] = (() => {
    switch (shapeType.schema) {
      case ClassShapeType.schema:
        return ["classes", "Class"];
      default:
        throw new Error(`Unknown type: ${shapeType.schema.type}`);
    }
  })();
  const { dataset, getSubject } = useLdo();
  const { isLoading } = useRulesBundle(rulesBundle);

  return useMemo(() => {
    if (!dataset || isLoading) return { isLoading };
    return {
      isLoading,
      items: dataset
        .match(null, null, namedNode(vocabUrl(type)))
        .toArray()
        .map((quad) => getSubject(shapeType, quad.subject.value)),
    };
  }, [dataset, isLoading]);
}
