import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import { MonsterShapeType } from "../ldo/dnd5e.shapeTypes";
import { Monster } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import monsters from "../dnd5eapi-data/5e-SRD-Monsters.json";
import { writeFileSync } from "node:fs";
import { addendumPath, dataPath } from "../utils/dnd5e";
import { readFileSync } from "fs";

export function transformMonster(
  data: components["schemas"]["Monster"],
  ldoDataset = createLdoDataset(),
): Monster {
  const monster = ldoDataset
    .usingType(MonsterShapeType)
    .fromSubject(`#${data.index}`);
  monster.type = type("Monster");
  monster.label = data.name;
  // charisma
  // constitution
  // dexterity
  // intelligence
  // strength
  // wisdom
  monster.size = data.size;
  monster.ofType = data.type;
  monster.subtype = data.subtype;
  // monsterArmorClass
  monster.hitPoints = data.hit_points;
  monster.hitDice = data.hit_dice;
  monster.hitPointsRoll = data.hit_points_roll;
  // monsterActions
  // legendaryActions
  monster.challengeRating = data.challenge_rating;
  // proficiencyBonus
  // conditionImmunities
  // damageImmunities
  // damageResistances
  // damageVulnerabilities
  // forms
  // monsterLanguages
  // monsterProficiencies
  // reactions
  // senses
  // specialAbilities
  // monsterSpeed
  monster.xp = data.xp;
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
  const addendum = readFileSync(addendumPath("monsters"), "utf-8");
  writeFileSync(dataPath("monsters"), turtle + addendum);
}
