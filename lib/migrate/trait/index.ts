import { getReference, migrateData } from "../common";
import { TraitData, TraitSpecificData } from "../../download/api.types";
import { Trait, TraitSpecific } from "../../sanity/schema-types";
import {
  createKeyedArray,
  migrateOptional,
  migrateToMarkdown,
} from "../../manage-data";
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
    ...migrateOptional<Trait>(
      "proficiencyChoices",
      trait.proficiency_choices,
      (val) => migrateProficiencyChoices(val, preparedDataMap)
    ),
    ...migrateOptional<Trait, TraitSpecificData, TraitSpecific>(
      "traitSpecific",
      trait.trait_specific,
      (value) => migrateTraitSpecific(value, preparedDataMap)
    ),
  }));
}
