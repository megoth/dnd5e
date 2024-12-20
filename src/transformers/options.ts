import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import {
  ActionOptionShapeType,
  DamageShapeType,
  EquipmentShapeType,
  MultipleOptionShapeType,
  ProficiencyShapeType,
  ReferenceOptionShapeType,
  SpellShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { ActionOption, ReferenceOption } from "../ldo/dnd5e.typings";
import { dataUrl } from "../utils/dnd5e";

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

  interface IReferenceOption {
    item?: components["schemas"]["APIReference"];
  }

  function transformReferenceOption(
    data: IReferenceOption,
    ldoDataset = createLdoDataset(),
  ): ReferenceOption {
    const [_, type, id] = data.item.url.match(/api\/(\w+)\//);
    const itemUrl = dataUrl(type, id);
    return ldoDataset.usingType(ReferenceOptionShapeType).fromJson({
      ...(type === "equipment" && {
        equipment: ldoDataset
          .usingType(EquipmentShapeType)
          .fromSubject(itemUrl),
      }),
      ...(type === "languages" && {
        equipment: ldoDataset.usingType(DamageShapeType).fromSubject(itemUrl),
      }),
      ...(type === "proficiencies" && {
        equipment: ldoDataset
          .usingType(ProficiencyShapeType)
          .fromSubject(itemUrl),
      }),
      ...(type === "spells" && {
        equipment: ldoDataset.usingType(SpellShapeType).fromSubject(itemUrl),
      }),
    });
  }

  switch (data.option_type) {
    // case "ability_bonus":
    //   return null;
    case "action":
      return transformActionOption(data as IActionOption, ldoDataset);
    // case "breath":
    //   return null;
    // case "choice":
    //   return null;
    // case "counted_reference":
    //   return null;
    // case "ideal":
    //   return null;
    case "multiple":
      return transformMultipleOption(data as IMultipleOption, ldoDataset);
    case "reference":
      return transformReferenceOption(data as IReferenceOption, ldoDataset);
    // case "string":
    //   return null;
    default:
      throw new Error(`Unsupported type ${data.option_type}`);
  }
}

export function transformOptions(
  data: Array<components["schemas"]["Option"]>,
  ldoDataset = createLdoDataset(),
) {
  return data.map((option) => transformOption(option, ldoDataset));
}
