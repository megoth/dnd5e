import { AreaOfEffectData } from "../../download/api.types";
import { AreaOfEffect } from "../../sanity/schema-types";

export function migrateAreaOfEffectValue(
  value: AreaOfEffectData
): AreaOfEffect {
  return {
    _type: "areaOfEffect",
    type: value.type,
    size: value.size,
  };
}

export default function migrateAreaOfEffect<T>(
  key: keyof T,
  value?: AreaOfEffectData
): Record<string, AreaOfEffect> {
  return value ? { [key]: migrateAreaOfEffectValue(value) } : {};
}
