import { SanityKeyed } from "sanity-codegen";
import { ActionData, DamageData } from "../../../download/api.types";
import { Damage } from "../../../sanity/schema-types";
import { createKeyedArray } from "../../../manage-data";
import migrateDamage from "../../damage";

export default function migrateActionDamage(
  value: ActionData,
  preparedDataMap
): Array<SanityKeyed<Damage>> {
  const damages = (value.damage || []).filter(
    (dam) => "damage_type" in dam || "damage_at_slot_level" in dam
  ) as Array<DamageData>;
  return damages.length
    ? createKeyedArray(
        damages.map((dam) => migrateDamage(dam, preparedDataMap))
      )
    : [];
}
