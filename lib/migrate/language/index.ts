import { migrateData } from "../common";
import { LanguageData } from "../../download/api.types";
import { Language } from "../../sanity/schema-types";

export default function migrateLanguageData(preparedDataMap) {
  return migrateData<LanguageData, Language>(preparedDataMap, (language) => ({
    _type: "language",
    name_en_US: language.name,
    description_en_US: language.desc,
    type: language.type,
    typicalSpeakers_en_US: language.typical_speakers,
    ...(language.script ? { script_en_US: language.script } : {}),
  }));
}
