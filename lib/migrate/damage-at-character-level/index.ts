import { DamageAtCharacterLevel } from "../../sanity/schema-types";

function migrateObject(
  value: Record<string, string>
): Array<DamageAtCharacterLevel> {
  return Object.entries(value).map(([level, damage]) => ({
    _type: "damageAtCharacterLevel",
    level: parseInt(level, 10),
    damage,
  }));
}

export default function migrateDamageAtCharacterLevels<T>(
  key: keyof T,
  value?: Record<string, string>
): Record<string, Array<DamageAtCharacterLevel>> {
  return value ? { [key]: migrateObject(value) } : {};
}
