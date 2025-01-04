import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  EquipmentCategoryShapeType,
  OptionSetShapeType,
  ResourceListOptionSetShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  IChoiceOption,
  ICountedReferenceOption,
  IReferenceOption,
  transformChoiceOption,
  transformCountedReferenceOption,
  transformReferenceOption,
  transformScorePrerequisiteOption,
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
  // TODO: string, ideal, counted_reference, breath
  return ldoDataset.usingType(OptionSetShapeType).fromJson({
    abilityScores: data.options
      .filter((option) => option.option_type === "score_prerequisite")
      .map((option) => transformScorePrerequisiteOption(option, ldoDataset)),
    choices: data.options
      .filter((option) => option.option_type === "choice")
      .map((option) =>
        transformChoiceOption(option as IChoiceOption, ldoDataset),
      ),
    counts: data.options
      .filter((option) => option.option_type === "counted_reference")
      .map((option) =>
        transformCountedReferenceOption(
          option as ICountedReferenceOption,
          ldoDataset,
        ),
      ),
    references: data.options
      .filter((option) => option.option_type === "reference")
      .map((option) =>
        transformReferenceOption(option as IReferenceOption, ldoDataset),
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
  const [_, type] = data.resource_list_url?.match(/api\/(\S+)\//) || [];
  return ldoDataset.usingType(ResourceListOptionSetShapeType).fromJson({
    resourceList: dataUrl(type),
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
