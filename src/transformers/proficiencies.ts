import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ClassShapeType,
  ProficiencyShapeType,
  RaceShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";

export function transformProficiency(
  data: components["schemas"]["Proficiency"],
  datasetUrl: string,
  classUrl: string,
  raceUrl: string,
): Proficiency {
  const ldoDataset = createLdoDataset();
  const proficiency = ldoDataset
    .usingType(ProficiencyShapeType)
    .fromSubject(datasetUrl + data.index);
  proficiency.label = data.name;
  proficiency.proficiencyType = data.type;
  proficiency.class = data.classes.map((classData) =>
    ldoDataset
      .usingType(ClassShapeType)
      .fromSubject(classUrl + classData.index),
  );
  proficiency.race = data.races.map((race) =>
    ldoDataset.usingType(RaceShapeType).fromSubject(raceUrl + race.index),
  );
  return proficiency;
}

export default async function transformProficiencies(
  data: Array<components["schemas"]["Proficiency"]>,
  datasetPath: string,
  datasetUrl: string,
  classUrl: string,
  raceUrl: string,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((proficiency) =>
        toTurtle(
          transformProficiency(proficiency, datasetUrl, classUrl, raceUrl),
        ),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(process.cwd() + datasetPath, turtle);
}
