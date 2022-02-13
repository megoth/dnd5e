import { Subtrait } from "../../../download/api.types";
import { Trait, TraitSpecific } from "../../../sanity/schema-types";
import migrateChoiceReference from "../../choice";

export default function migrateTraitSpecificSubtrait(
  value: Subtrait,
  preparedDataMap
): Pick<TraitSpecific, "subtraitOptions"> {
  return {
    subtraitOptions: migrateChoiceReference<"traitChoice", Trait>(
      preparedDataMap,
      "traitChoice",
      value.subtrait_options
    ),
  };
}
