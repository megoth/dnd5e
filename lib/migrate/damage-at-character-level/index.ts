import { SanityKeyed } from "sanity-codegen";
import { DamageAtCharacterLevel } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";

export default function migrateDamageAtCharacterLevels(
  value: Record<string, string>
): Array<SanityKeyed<DamageAtCharacterLevel>> {
  return createKeyedArray(
    Object.entries(value).map(([level, damage]) => ({
      _type: "damageAtCharacterLevel",
      level: parseInt(level, 10),
      damage,
    }))
  );
}
