import { DamageAtCharacterLevel } from "../../sanity/schema-types";

export default function getDamageAtCharacterLevels<T>(
  key: keyof T,
  value?: Record<string, string>
): {} | Record<keyof T, Array<DamageAtCharacterLevel>> {
  return value
    ? {
        [key]: Object.entries(value).map(([level, damage]) => ({
          level: parseInt(level, 10),
          damage,
        })),
      }
    : {};
}
