import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  ActionOptionShapeType,
  ChoiceOptionShapeType,
  CountOptionShapeType,
  EquipmentShapeType,
  LanguageShapeType,
  MultipleOptionShapeType,
  ProficiencyShapeType,
  ReferenceOptionShapeType,
  ScorePrerequisiteOptionShapeType,
  SpellShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  ActionOption,
  ChoiceOption,
  CountOption,
  ReferenceOption,
  ScorePrerequisiteOption,
} from "../ldo/dnd5e.typings";
import { dataUrl } from "../utils/dnd5e";
import { transformChoice } from "./choice";

export interface IChoiceOption {
  choice?: components["schemas"]["Choice"];
}

export function transformChoiceOption(
  data: IChoiceOption,
  ldoDataset = createLdoDataset(),
): ChoiceOption {
  return ldoDataset.usingType(ChoiceOptionShapeType).fromJson({
    choice: transformChoice(data.choice, ldoDataset),
  });
}

export interface ICountedReferenceOption {
  count?: number;
  of?: components["schemas"]["APIReference"];
}

export function transformCountedReferenceOption(
  data: ICountedReferenceOption,
  ldoDataset = createLdoDataset(),
): CountOption {
  return ldoDataset.usingType(CountOptionShapeType).fromJson({
    count: data.count,
    of: ldoDataset
      .usingType(EquipmentShapeType)
      .fromSubject(dataUrl("equipments", data.of.index)),
  });
}

export interface IReferenceOption {
  item?: components["schemas"]["APIReference"];
}

interface IScorePrerequisiteOption {
  option_type?: string;
  ability_score?: components["schemas"]["APIReference"];
  minimum_score?: number;
}

export function transformScorePrerequisiteOption(
  data: IScorePrerequisiteOption,
  ldoDataset = createLdoDataset(),
): ScorePrerequisiteOption {
  return ldoDataset.usingType(ScorePrerequisiteOptionShapeType).fromJson({
    abilityScore: ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(dataUrl("abilityScores", data.ability_score.index)),
    minimumScore: data.minimum_score,
  });
}

export function transformReferenceOption(
  data: IReferenceOption,
  ldoDataset = createLdoDataset(),
): ReferenceOption {
  const [_, type, id] = data.item.url.match(/api\/(\S+)\/(\S+)/);
  const itemUrl = dataUrl(type, id);
  return ldoDataset.usingType(ReferenceOptionShapeType).fromJson({
    ...(type === "equipment" && {
      equipment: ldoDataset.usingType(EquipmentShapeType).fromSubject(itemUrl),
    }),
    ...(type === "languages" && {
      language: ldoDataset.usingType(LanguageShapeType).fromSubject(itemUrl),
    }),
    ...(type === "proficiencies" && {
      proficiency: ldoDataset
        .usingType(ProficiencyShapeType)
        .fromSubject(itemUrl),
    }),
    ...(type === "spells" && {
      spell: ldoDataset.usingType(SpellShapeType).fromSubject(itemUrl),
    }),
  });
}

export function transformOption(
  data: components["schemas"]["Option"],
  ldoDataset = createLdoDataset(),
) {
  interface IActionOption {
    option_type?: string;
    action_name?: string;
    count?: number;
    type?: "melee" | "ranged" | "ability" | "magic";
  }

  function transformActionOption(
    data: IActionOption,
    ldoDataset = createLdoDataset(),
  ): ActionOption {
    return ldoDataset.usingType(ActionOptionShapeType).fromJson({
      label: data.action_name,
    });
  }

  interface IMultipleOption {
    items?: components["schemas"]["Option"][];
  }

  function transformMultipleOption(
    data: IMultipleOption,
    ldoDataset = createLdoDataset(),
  ) {
    return ldoDataset.usingType(MultipleOptionShapeType).fromJson({
      actions: data.items
        .filter((item) => item.option_type === "action")
        .map((item) => transformOption(item, ldoDataset)),
      choices: data.items
        .filter((item) => item.option_type === "choice")
        .map((item) => transformOption(item, ldoDataset)),
      counts: data.items
        .filter((item) => item.option_type === "counted_reference")
        .map((item) => transformOption(item, ldoDataset)),
      references: data.items
        .filter((item) => item.option_type === "reference")
        .map((item) => transformOption(item, ldoDataset)),
    });
  }

  switch (data.option_type) {
    // case "ability_bonus":
    //   return null;
    case "action":
      return transformActionOption(data as IActionOption, ldoDataset);
    // case "breath":
    //   return null;
    case "choice":
      return transformChoiceOption(data as IChoiceOption, ldoDataset);
    case "counted_reference":
      return transformCountedReferenceOption(
        data as ICountedReferenceOption,
        ldoDataset,
      );
    // case "ideal":
    //   return null;
    case "multiple":
      return transformMultipleOption(data as IMultipleOption, ldoDataset);
    case "reference":
      return transformReferenceOption(data as IReferenceOption, ldoDataset);
    case "score_prerequisite":
      return transformScorePrerequisiteOption(
        data as IScorePrerequisiteOption,
        ldoDataset,
      );
    // case "string":
    //   return null;
    default:
      throw new Error(`Unsupported type ${data.option_type}`);
  }
}
