import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  AbilityBonusShapeType,
  AbilityScoreShapeType,
  ActionOptionShapeType,
  AlignmentShapeType,
  BreathOptionShapeType,
  ChoiceOptionShapeType,
  EquipmentOptionShapeType,
  EquipmentShapeType,
  IdealOptionShapeType,
  LanguageShapeType,
  MultipleOptionShapeType,
  ProficiencyShapeType,
  ReferenceOptionShapeType,
  ScorePrerequisiteOptionShapeType,
  SpellShapeType,
  StringOptionShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  AbilityBonus,
  ActionOption,
  BreathOption,
  ChoiceOption,
  EquipmentOption,
  ReferenceOption,
  ScorePrerequisiteOption,
  StringOption,
} from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataUrl } from "../utils/dnd5e";
import { transformChoice } from "./choice";
import { transformDifficultyClass } from "./difficultyClass";
import { transformDamage } from "./damage";

export interface IAbilityBonusOption {
  ability_score?: components["schemas"]["APIReference"];
  bonus?: number;
}

export function transformAbilityBonusOption(
  data: IAbilityBonusOption,
  ldoDataset = createLdoDataset(),
): AbilityBonus {
  return ldoDataset.usingType(AbilityBonusShapeType).fromJson({
    abilityScore: ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.ability_score.url)),
    bonus: data.bonus,
  });
}

export interface IActionOption {
  action_name?: string;
  count?: number;
  type?: "melee" | "ranged" | "ability" | "magic";
}

export function transformActionOption(
  data: IActionOption,
  ldoDataset = createLdoDataset(),
): ActionOption {
  return ldoDataset.usingType(ActionOptionShapeType).fromJson({
    label: data.action_name,
  });
}

export interface IBreathOption {
  name?: string;
  dc?: components["schemas"]["DC"];
  damage?: components["schemas"]["Damage"][];
}

export function transformBreathOption(
  data: IBreathOption,
  ldoDataset = createLdoDataset(),
): BreathOption {
  return ldoDataset.usingType(BreathOptionShapeType).fromJson({
    label: data.name,
    difficultyClass: transformDifficultyClass(data.dc, ldoDataset),
    breathDamage: data.damage?.map((damage) =>
      transformDamage(damage, ldoDataset),
    ),
  });
}

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

export interface IEquipmentOption {
  count?: number;
  of?: components["schemas"]["APIReference"];
}

export function transformEquipmentOption(
  data: IEquipmentOption,
  ldoDataset = createLdoDataset(),
): EquipmentOption {
  return ldoDataset.usingType(EquipmentOptionShapeType).fromJson({
    count: data.count,
    equipment: ldoDataset
      .usingType(EquipmentShapeType)
      .fromSubject(dataUrl("equipments", data.of.index)),
  });
}

export interface IIdealOption {
  desc?: string;
  alignments: components["schemas"]["APIReference"][];
}

export function transformIdealOption(
  data: IIdealOption,
  ldoDataset = createLdoDataset(),
): StringOption {
  return ldoDataset.usingType(IdealOptionShapeType).fromJson({
    description: [data.desc],
    alignments: data.alignments.map((alignment) =>
      ldoDataset
        .usingType(AlignmentShapeType)
        .fromSubject(apiUrlToSubjectUrl(alignment.url)),
    ),
  });
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
      .fromSubject(dataUrl("ability-scores", data.ability_score.index)),
    minimumScore: data.minimum_score,
  });
}

export interface IReferenceOption {
  item?: components["schemas"]["APIReference"];
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

export interface IStringOption {
  string?: string;
}

export function transformStringOption(
  data: IStringOption,
  ldoDataset = createLdoDataset(),
): StringOption {
  return ldoDataset.usingType(StringOptionShapeType).fromJson({
    string: data.string,
  });
}

export function transformOption(
  data: components["schemas"]["Option"],
  ldoDataset = createLdoDataset(),
) {
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
      equipmentOptions: data.items
        .filter((item) => item.option_type === "counted_reference")
        .map((item) => transformOption(item, ldoDataset)),
      references: data.items
        .filter((item) => item.option_type === "reference")
        .map((item) => transformOption(item, ldoDataset)),
    });
  }

  switch (data.option_type) {
    case "ability_bonus":
      return transformAbilityBonusOption(
        data as IAbilityBonusOption,
        ldoDataset,
      );
    case "action":
      return transformActionOption(data as IActionOption, ldoDataset);
    case "breath":
      return transformBreathOption(data as IBreathOption, ldoDataset);
    case "choice":
      return transformChoiceOption(data as IChoiceOption, ldoDataset);
    case "counted_reference":
      return transformEquipmentOption(data as IEquipmentOption, ldoDataset);
    case "ideal":
      return transformIdealOption(data as IIdealOption, ldoDataset);
    case "multiple":
      return transformMultipleOption(data as IMultipleOption, ldoDataset);
    case "reference":
      return transformReferenceOption(data as IReferenceOption, ldoDataset);
    case "score_prerequisite":
      return transformScorePrerequisiteOption(
        data as IScorePrerequisiteOption,
        ldoDataset,
      );
    case "string":
      return transformStringOption(data as IStringOption, ldoDataset);
    default:
      throw new Error(`Unsupported type ${data.option_type}`);
  }
}
