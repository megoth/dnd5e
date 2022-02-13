import { ChoiceData } from "../../download/api.types";
import migrateChoiceReference from "../choice";
import { Proficiency } from "../../sanity/schema-types";

export default function migrateProficiencyChoices(
  value: ChoiceData,
  preparedDataMap
) {
  return migrateChoiceReference<"proficiencyChoice", Proficiency>(
    preparedDataMap,
    "proficiencyChoice",
    value
  );
}
