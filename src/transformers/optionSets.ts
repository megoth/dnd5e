import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  OptionSetShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  IAbilityBonusOption,
  IActionOption,
  IBreathOption,
  IChoiceOption,
  IEquipmentOption,
  IIdealOption,
  IReferenceOption,
  IStringOption,
  transformAbilityBonusOption,
  transformActionOption,
  transformBreathOption,
  transformChoiceOption,
  transformEquipmentOption,
  transformIdealOption,
  transformReferenceOption,
  transformScorePrerequisiteOption,
  transformStringOption,
} from "./options";
import { dataUrl } from "../utils/dnd5e";
import { OptionSet } from "../ldo/dnd5e.typings";

interface IEquipmentCategory {
  option_set_type?: string;
  equipment_category?: components["schemas"]["APIReference"];
}

function transformEquipmentCategory(
  data: IEquipmentCategory,
  ldoDataset = createLdoDataset(),
): OptionSet {
  return ldoDataset.usingType(OptionSetShapeType).fromJson({
    equipmentCategory: ldoDataset
      .usingType(EquipmentCategoryShapeType)
      .fromSubject(
        dataUrl("equipment-categories", data.equipment_category.index),
      ),
  });
}

interface IOptionsArray {
  options?: components["schemas"]["Option"][];
}

function transformOptionsArray(
  data: IOptionsArray,
  ldoDataset = createLdoDataset(),
) {
  return ldoDataset.usingType(OptionSetShapeType).fromJson({
    abilityScores: data.options
      .filter((option) => option.option_type === "score_prerequisite")
      .map((option) => transformScorePrerequisiteOption(option, ldoDataset)),
    actions: data.options
      .filter((option) => option.option_type === "action")
      .map((option) =>
        transformActionOption(option as IActionOption, ldoDataset),
      ),
    bonuses: data.options
      .filter((option) => option.option_type === "ability_bonus")
      .map((option) =>
        transformAbilityBonusOption(option as IAbilityBonusOption, ldoDataset),
      ),
    breaths: data.options
      .filter((option) => option.option_type === "breath")
      .map((option) =>
        transformBreathOption(option as IBreathOption, ldoDataset),
      ),
    choices: data.options
      .filter((option) => option.option_type === "choice")
      .map((option) =>
        transformChoiceOption(option as IChoiceOption, ldoDataset),
      ),
    equipmentOptions: data.options
      .filter((option) => option.option_type === "counted_reference")
      .map((option) =>
        transformEquipmentOption(option as IEquipmentOption, ldoDataset),
      ),
    ideals: data.options
      .filter((option) => option.option_type === "ideal")
      .map((option) =>
        transformIdealOption(option as IIdealOption, ldoDataset),
      ),
    references: data.options
      .filter((option) => option.option_type === "reference")
      .map((option) =>
        transformReferenceOption(option as IReferenceOption, ldoDataset),
      ),
    strings: data.options
      .filter((option) => option.option_type === "string")
      .map((option) =>
        transformStringOption(option as IStringOption, ldoDataset),
      ),
  });
}

interface IResourceList {
  resource_list_url?: string;
}

function transformResourceList(
  data: IResourceList,
  ldoDataset = createLdoDataset(),
) {
  const [_, ofType] = data.resource_list_url?.match(/\/api\/(\S+)/) || [];
  return ldoDataset.usingType(OptionSetShapeType).fromJson({
    ofType,
  });
}

export function transformOptionSet(
  data: components["schemas"]["OptionSet"],
  ldoDataset = createLdoDataset(),
) {
  switch (data.option_set_type) {
    case "equipment_category":
      return transformEquipmentCategory(data as IEquipmentCategory, ldoDataset);
    case "options_array":
      return transformOptionsArray(data as IOptionsArray, ldoDataset);
    case "resource_list":
      return transformResourceList(data as IResourceList, ldoDataset);
    default:
      throw new Error(`Unrecognized type: ${data.option_set_type}`);
  }
}
