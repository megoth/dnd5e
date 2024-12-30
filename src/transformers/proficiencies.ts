import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ClassShapeType,
  ProficiencyShapeType,
  RaceShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";

export function transformProficiency(
  data: components["schemas"]["Proficiency"],
  ldoDataset = createLdoDataset(),
): Proficiency {
  const proficiency = ldoDataset
    .usingType(ProficiencyShapeType)
    .fromSubject(`#${data.index}`);
  proficiency.type = type("Proficiency");
  proficiency.label = data.name;
  proficiency.proficiencyType = data.type;
  proficiency.classes = data.classes.map((classData) =>
    createLdoDataset()
      .usingType(ClassShapeType)
      .fromSubject(dataUrl("classes", classData.index)),
  );
  proficiency.races = data.races.map((race) =>
    createLdoDataset()
      .usingType(RaceShapeType)
      .fromSubject(dataUrl("races", race.index)),
  );
  return proficiency;
}

export default async function writeProficiencies(
  data: Array<components["schemas"]["Proficiency"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((proficiency) => toTurtle(transformProficiency(proficiency))),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(dataPath("proficiencies"), turtle);
}
