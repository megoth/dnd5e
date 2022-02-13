import { DragonkindTrait } from "../../../download/api.types";
import { TraitSpecific } from "../../../sanity/schema-types";
import { getReference } from "../../common";
import migrateAction from "../../action";

export default function migrateTraitSpecificDragonkind(
  value: DragonkindTrait,
  preparedDataMap
): Pick<TraitSpecific, "damageType" | "breathWeapon"> {
  return {
    damageType: getReference(preparedDataMap, value.damage_type.url),
    breathWeapon: migrateAction(value.breath_weapon, preparedDataMap),
  };
}
