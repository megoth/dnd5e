import {
  AbilityScoreShapeType,
  DifficultyClassShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { createLdoDataset } from "@ldo/ldo";
import { DifficultyClass } from "../ldo/dnd5e.typings";
import { components } from "../typings/dnd5eapi";
import { apiUrlToSubjectUrl } from "../utils/dnd5e";

export function transformDifficultyClass(
  data: components["schemas"]["DC"],
  ldoDataset = createLdoDataset(),
): DifficultyClass {
  return ldoDataset.usingType(DifficultyClassShapeType).fromJson({
    dcType: ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.dc_type.url)),
    value: data.dc_value,
    successType: data.success_type,
  });
}
