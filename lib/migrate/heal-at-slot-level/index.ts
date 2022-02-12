import { createKeyedArray } from "../../manage-data";
import { HealAtSlotLevel } from "../../sanity/schema-types";

export function migrateHealAtSlotLevelValue(
  value: Record<string, string>
): Array<HealAtSlotLevel> {
  return Object.entries(value).map(([slot, heal]) => ({
    _type: "healAtSlotLevel",
    slot: parseInt(slot, 10),
    heal,
  }));
}

export default function migrateHealAtSlotLevel<T>(
  key: keyof T,
  value?: Record<string, string>
): Record<string, HealAtSlotLevel> {
  return value
    ? { [key]: createKeyedArray(migrateHealAtSlotLevelValue(value)) }
    : {};
}
