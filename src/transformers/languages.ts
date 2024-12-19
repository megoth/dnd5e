import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { LanguageShapeType } from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";

export function transformLanguage(
  data: components["schemas"]["Language"],
  datasetUrl: string,
): Proficiency {
  const language = createLdoDataset()
    .usingType(LanguageShapeType)
    .fromSubject(datasetUrl + data.index);
  language.label = data.name;
  language.description = data.desc;
  language.languageType = data.type;
  language.script = data.script;
  language.typicalSpeakers = data.typical_speakers;
  return language;
}

export default async function transformLanguages(
  data: Array<components["schemas"]["Language"]>,
  datasetPath: string,
  datasetUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((proficiency) =>
        toTurtle(transformLanguage(proficiency, datasetUrl)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
