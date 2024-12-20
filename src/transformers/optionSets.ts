import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  EquipmentCategoryOptionSetShapeType,
  EquipmentCategoryShapeType,
  OptionSetShapeType,
  ResourceListOptionSetShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { transformOption } from "./options";
import { dataUrl } from "../utils/dnd5e";
import {
  EquipmentCategoryOptionSet,
  ReferenceOption,
} from "../ldo/dnd5e.typings";

export function transformOptionSet(
  data: components["schemas"]["OptionSet"],
  ldoDataset = createLdoDataset(),
) {
  interface IEquipmentCategory {
    option_set_type?: string;
    equipment_category?: components["schemas"]["APIReference"];
  }

  function transformEquipmentCategory(
    data: IEquipmentCategory,
    ldoDataset = createLdoDataset(),
  ): EquipmentCategoryOptionSet {
    return ldoDataset.usingType(EquipmentCategoryOptionSetShapeType).fromJson({
      equipmentCategory: ldoDataset
        .usingType(EquipmentCategoryShapeType)
        .fromSubject(
          dataUrl("equipmentCategories", data.equipment_category.index),
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
      references: data.options
        .map((option) => transformOption(option, ldoDataset))
        .filter((option) => !!option["reference"]) as Array<ReferenceOption>,
    });
  }

  interface IResourceList {
    resource_list_url?: string;
  }

  function transformResourceList(
    data: IResourceList,
    ldoDataset = createLdoDataset(),
  ) {
    const [_, type] = data.resource_list_url?.match(/api\/(\w+)\//) || [];
    return ldoDataset.usingType(ResourceListOptionSetShapeType).fromJson({
      resourceList: dataUrl(type),
    });
  }

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
