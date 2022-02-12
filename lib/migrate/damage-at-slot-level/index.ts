import { DamageAtSlotLevel } from "../../sanity/schema-types";

function migrateObject(
  value: Record<string, string>
): Array<DamageAtSlotLevel> {
  return Object.entries(value).map(([slot, damage]) => ({
    _type: "damageAtSlotLevel",
    slot: parseInt(slot, 10),
    damage,
  }));
}

export default function migrateDamageAtSlotLevels<T>(
  key: keyof T,
  value?: Record<string, string>
): Record<string, Array<DamageAtSlotLevel>> {
  return value ? { [key]: migrateObject(value) } : {};
}
