import { ChoiceData } from "../../download/api.types";
import migrateChoiceReference from "../choice";
import { Proficiency } from "../../sanity/schema-types";

function migrateObject(preparedDataMap, value: ChoiceData) {
  return migrateChoiceReference<"proficiencyChoice", Proficiency>(
    preparedDataMap,
    "proficiencyChoice",
    value
  );
}

export default function migrateProficiencyChoices<T>(
  preparedDataMap,
  key: keyof T,
  value?: ChoiceData
) {
  return value ? { [key]: migrateObject(preparedDataMap, value) } : {};
}
