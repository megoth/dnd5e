import { SpellTrait } from "../../../download/api.types";
import { Spell, TraitSpecific } from "../../../sanity/schema-types";
import migrateChoiceReference from "../../choice";

export default function migrateTraitSpecificSpell(
  value: SpellTrait,
  preparedDataMap
): Pick<TraitSpecific, "spellOptions"> {
  return {
    spellOptions: migrateChoiceReference<"spellChoice", Spell>(
      preparedDataMap,
      "spellChoice",
      value.spell_options
    ),
  };
}
