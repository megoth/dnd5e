import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { MagicSchoolShapeType } from "../ldo/dnd5e.shapeTypes";
import { MagicSchool } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import schools from "../dnd5eapi-data/5e-SRD-Magic-Schools.json";
import { writeFileSync } from "node:fs";
import { dataPath } from "../utils/dnd5e";

export function transformMagicSchool(
  data: components["schemas"]["MagicSchool"],
  ldoDataset = createLdoDataset(),
): MagicSchool {
  const school = ldoDataset
    .usingType(MagicSchoolShapeType)
    .fromSubject(`#${data.index}`);
  school.type = type("MagicSchool");
  school.label = data.name;
  school.description = data.desc;
  return school;
}

export default async function writeMagicSchools() {
  const turtle = (
    await Promise.all(
      schools.map((school) => toTurtle(transformMagicSchool(school))),
    )
  ).reduce((memo, schools) => memo.concat(schools));
  writeFileSync(dataPath("magic-schools"), turtle);
}
