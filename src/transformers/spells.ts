import { components } from "../typings/dnd5eapi";
import { createLdoDataset } from "@ldo/ldo";
import { SpellShapeType } from "../ldo/dnd5e.shapeTypes";
import { Spell } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import spells from "../dnd5eapi-data/5e-SRD-Spells.json";

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
  return spell;
}
