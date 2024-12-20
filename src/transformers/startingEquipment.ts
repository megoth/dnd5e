import { components } from "../typings/dnd5eapi";
import { LdoDataset } from "@ldo/ldo";
import {
  EquipmentShapeType,
  StartingEquipmentShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { StartingEquipment } from "../ldo/dnd5e.typings";
import { dataUrl } from "../utils/dnd5e";

export function transformStartingEquipment(
  data: components["schemas"]["Background"]["starting_equipment"][0],
  dataset: LdoDataset,
): StartingEquipment {
  return dataset.usingType(StartingEquipmentShapeType).fromJson({
    equipment: dataset
      .usingType(EquipmentShapeType)
      .fromSubject(dataUrl("equipments", data.equipment.index)),
    quantity: data.quantity,
  });
}
