import { getReference, migrateData } from "../common";
import { TraitData } from "../../download/api.types";
import { Trait } from "../../sanity/schema-types";
import { createKeyedArray, migrateToMarkdown } from "../../manage-data";
import migrateProficiencyChoices from "../proficiency-choices";
import migrateTraitSpecific from "../trait-specific";

export default function migrateTraitData(preparedDataMap) {
  return migrateData<TraitData, Trait>(preparedDataMap, (trait) => ({
    _type: "trait",
    name_en_US: trait.name,
    description_en_US: migrateToMarkdown(trait.desc),
    ...(trait.parent
      ? { parent: getReference(preparedDataMap, trait.parent.url) }
      : {}),
    proficiencies: createKeyedArray(
      trait.proficiencies.map((proficiency) =>
        getReference(preparedDataMap, proficiency.url)
      )
    ),
    ...migrateProficiencyChoices<Trait>(
      preparedDataMap,
      "proficiencyChoices",
      trait.proficiency_choices
    ),
    ...migrateTraitSpecific<Trait>(
      preparedDataMap,
      "traitSpecific",
      trait.trait_specific
    ),
  }));
}
