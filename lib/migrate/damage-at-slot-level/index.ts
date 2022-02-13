import { SanityKeyed } from "sanity-codegen";
import { DamageAtSlotLevel } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";

export default function migrateDamageAtSlotLevels(
  value: Record<string, string>
): Array<SanityKeyed<DamageAtSlotLevel>> {
  return createKeyedArray(
    Object.entries(value).map(([slot, damage]) => ({
      _type: "damageAtSlotLevel",
      slot: parseInt(slot, 10),
      damage,
    }))
  );
}
