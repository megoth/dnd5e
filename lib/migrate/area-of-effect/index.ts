import { AreaOfEffectData } from "../../download/api.types";
import { AreaOfEffect } from "../../sanity/schema-types";

export default function migrateAreaOfEffect(
  value: AreaOfEffectData
): AreaOfEffect {
  return {
    _type: "areaOfEffect",
    type: value.type,
    size: value.size,
  };
}
