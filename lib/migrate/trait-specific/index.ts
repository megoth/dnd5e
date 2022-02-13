import { TraitSpecific } from "../../sanity/schema-types";
import { TraitSpecificData } from "../../download/api.types";
import migrateTraitSpecificDragonkind from "./dragonkind";
import migrateTraitSpecificSubtrait from "./subtrait-options";
import migrateTraitSpecificSpell from "./spell-options";

export default function migrateTraitSpecific(
  value: TraitSpecificData,
  preparedDataMap
): TraitSpecific {
  return {
    _type: "traitSpecific",
    ...("damage_type" in value
      ? migrateTraitSpecificDragonkind(value, preparedDataMap)
      : {}),
    ...("subtrait_options" in value
      ? migrateTraitSpecificSubtrait(value, preparedDataMap)
      : {}),
    ...("spell_options" in value
      ? migrateTraitSpecificSpell(value, preparedDataMap)
      : {}),
  };
}
