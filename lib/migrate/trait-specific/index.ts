import { Spell, Trait, TraitSpecific } from "../../sanity/schema-types";
import {
  DragonkindTrait,
  SpellTrait,
  Subtrait,
  TraitSpecificData,
} from "../../download/api.types";
import { getReference } from "../common";
import { migrateActionValue } from "../action";
import migrateChoiceReference from "../choice";

export function migrateTraitSpecificDragonkind(
  preparedDataMap,
  value: DragonkindTrait
): Pick<TraitSpecific, "damageType" | "breathWeapon"> {
  return {
    damageType: getReference(preparedDataMap, value.damage_type.url),
    breathWeapon: migrateActionValue(preparedDataMap, value.breath_weapon),
  };
}

export function migrateTraitSpecificSubtrait(
  preparedDataMap,
  value: Subtrait
): Pick<TraitSpecific, "subtraitOptions"> {
  return {
    subtraitOptions: migrateChoiceReference<"traitChoice", Trait>(
      preparedDataMap,
      "traitChoice",
      value.subtrait_options
    ),
  };
}

export function migrateTraitSpecificSpell(
  preparedDataMap,
  value: SpellTrait
): Pick<TraitSpecific, "spellOptions"> {
  return {
    spellOptions: migrateChoiceReference<"spellChoice", Spell>(
      preparedDataMap,
      "spellChoice",
      value.spell_options
    ),
  };
}

export function migrateTraitSpecificValue(
  preparedDataMap,
  value: TraitSpecificData
): TraitSpecific {
  return {
    _type: "traitSpecific",
    ...("damage_type" in value
      ? migrateTraitSpecificDragonkind(preparedDataMap, value)
      : {}),
    ...("subtrait_options" in value
      ? migrateTraitSpecificSubtrait(preparedDataMap, value)
      : {}),
    ...("spell_options" in value
      ? migrateTraitSpecificSpell(preparedDataMap, value)
      : {}),
  };
}

export default function migrateTraitSpecific<T>(
  preparedDataMap,
  key: keyof T,
  value?: TraitSpecificData
): Record<string, TraitSpecific> {
  return value
    ? { [key]: migrateTraitSpecificValue(preparedDataMap, value) }
    : {};
}
