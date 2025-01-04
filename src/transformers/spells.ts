import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { MagicSchoolShapeType, SpellShapeType } from "../ldo/dnd5e.shapeTypes";
import { Spell } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import spells from "../dnd5eapi-data/5e-SRD-Spells.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";

export function classSpells(classApiUrl: string): Array<string> {
  return spells
    .filter(
      (spell) =>
        !!spell.classes.find((classData) => classData.url === classApiUrl),
    )
    .map((spell) => spell.url);
}

export function transformSpell(
  data: components["schemas"]["Spell"],
  ldoDataset = createLdoDataset(),
): Spell {
  const spell = ldoDataset
    .usingType(SpellShapeType)
    .fromSubject(`#${data.index}`);
  spell.type = type("Spell");
  spell.label = data.name;
  // description
  // higherLevel
  // range
  // components
  // material
  // areaOfEffect
  // ritual
  // duration
  // concentration
  // castingTime
  // level
  // attackType
  // damage
  spell.magicSchool =
    data.school &&
    ldoDataset
      .usingType(MagicSchoolShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.school.url));
  // classes
  // subclasses
  return spell;
}

export default async function writeSpells() {
  const turtle = (
    await Promise.all(
      spells.map((spell) =>
        toTurtle(transformSpell(spell as components["schemas"]["Spell"])),
      ),
    )
  ).reduce((memo, spells) => memo.concat(spells));
  writeFileSync(dataPath("spells"), turtle);
}
