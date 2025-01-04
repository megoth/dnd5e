import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { LanguageShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";
import { dataPath } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import languages from "../dnd5eapi-data/5e-SRD-Languages.json";

export function transformLanguage(
  data: components["schemas"]["Language"],
  ldoDataset = createLdoDataset(),
): Proficiency {
  const language = ldoDataset
    .usingType(LanguageShapeType)
    .fromSubject(`#${data.index}`);
  language.type = type("Language");
  language.label = data.name;
  language.description = data.desc;
  language.languageType = data.type;
  language.script = data.script;
  language.typicalSpeakers = data.typical_speakers;
  return language;
}

export default async function writeLanguages() {
  const turtle = (
    await Promise.all(
      languages.map((proficiency) =>
        toTurtle(
          transformLanguage(proficiency as components["schemas"]["Language"]),
        ),
      ),
    )
  ).reduce((memo, language) => memo.concat(language));
  writeFileSync(dataPath("languages"), turtle);
}
