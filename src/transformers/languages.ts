import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { LanguageShapeType, TypeShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl, vocabUrl } from "../utils/dnd5e";

export function transformLanguage(
  data: components["schemas"]["Language"],
): Proficiency {
  const language = createLdoDataset()
    .usingType(LanguageShapeType)
    .fromSubject(dataUrl("languages", data.index));
  language.type = createLdoDataset()
    .usingType(TypeShapeType)
    .fromSubject(vocabUrl("Language"));
  language.label = data.name;
  language.description = data.desc;
  language.languageType = data.type;
  language.script = data.script;
  language.typicalSpeakers = data.typical_speakers;
  return language;
}

export default async function transformLanguages(
  data: Array<components["schemas"]["Language"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((proficiency) => toTurtle(transformLanguage(proficiency))),
    )
  ).reduce((memo, language) => memo.concat(language));
  writeFileSync(dataPath("languages"), turtle);
}
