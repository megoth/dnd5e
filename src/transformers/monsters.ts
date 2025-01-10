import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { MonsterShapeType } from "../ldo/dnd5e.shapeTypes";
import { Monster } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import monsters from "../dnd5eapi-data/5e-SRD-Monsters.json";
import { writeFileSync } from "node:fs";
import { dataPath } from "../utils/dnd5e";

export function transformMonster(
  data: components["schemas"]["Monster"],
  ldoDataset = createLdoDataset(),
): Monster {
  const monster = ldoDataset
    .usingType(MonsterShapeType)
    .fromSubject(`#${data.index}`);
  monster.type = type("Monster");
  monster.label = data.name;
  return monster;
}

export default async function writeMonsters() {
  const turtle = (
    await Promise.all(
      monsters.map((monster) =>
        toTurtle(transformMonster(monster as components["schemas"]["Monster"])),
      ),
    )
  ).reduce((memo, monsters) => memo.concat(monsters));
  writeFileSync(dataPath("monsters"), turtle);
}
