import { SanityKeyed } from "sanity-codegen";
import { createKeyedArray } from "../../manage-data";
import { HealAtSlotLevel } from "../../sanity/schema-types";

export default function migrateHealAtSlotLevel(
  value: Record<string, string>
): Array<SanityKeyed<HealAtSlotLevel>> {
  return createKeyedArray(
    Object.entries(value).map(([slot, heal]) => ({
      _type: "healAtSlotLevel",
      slot: parseInt(slot, 10),
      heal,
    }))
  );
}
