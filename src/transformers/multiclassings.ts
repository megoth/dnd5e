import {
  AbilityScoreShapeType,
  MulticlassingShapeType,
  PrerequisiteShapeType,
  ProficiencyShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { dataUrl } from "../utils/dnd5e";
import { transformChoice } from "./choice";
import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";

export default function transformMulticlassing(
  data: components["schemas"]["Multiclassing"],
  ldoDataset = createLdoDataset(),
) {
  return ldoDataset.usingType(MulticlassingShapeType).fromJson({
    prerequisites: data.prerequisites?.map((prerequisite) =>
      ldoDataset.usingType(PrerequisiteShapeType).fromJson({
        abilityScore: ldoDataset
          .usingType(AbilityScoreShapeType)
          .fromSubject(
            dataUrl("abilityScores", prerequisite.ability_score.index),
          ),
        minimumScore: prerequisite.minimum_score,
      }),
    ),
    ...(data.prerequisite_options && {
      prerequisiteOptions: transformChoice(
        data.prerequisite_options,
        ldoDataset,
      ),
    }),
    proficiencies: data.proficiencies?.map((proficiency) =>
      ldoDataset
        .usingType(ProficiencyShapeType)
        .fromSubject(dataUrl("proficiencies", proficiency.index)),
    ),
    proficiencyChoices: data.proficiency_choices?.map((choice) =>
      transformChoice(choice, ldoDataset),
    ),
  });
}
