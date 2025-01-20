import { Choice } from "../ldo/dnd5e.typings";
import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import { ChoiceShapeType } from "../ldo/dnd5e.shapeTypes";
import { transformOptionSet } from "./optionSets";

export function transformChoice(
  data: components["schemas"]["Choice"],
  ldoDataset = createLdoDataset(),
): Choice {
  return ldoDataset.usingType(ChoiceShapeType).fromJson({
    type: { "@id": "Choice" },
    ...(data.desc && {
      description: [data.desc],
    }),
    ...(data.choose && {
      choose: data.choose,
    }),
    ...(data.type && {
      ofType: data.type,
    }),
    ...(data.from && {
      from: transformOptionSet(data.from, ldoDataset),
    }),
  });
}
