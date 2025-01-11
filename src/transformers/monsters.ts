import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  MonsterAbilityShapeType,
  MonsterShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Monster, MonsterAbility } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import monsters from "../dnd5eapi-data/5e-SRD-Monsters.json";
import { writeFileSync } from "node:fs";
import { addendumPath, dataPath, dataUrl } from "../utils/dnd5e";
import { readFileSync } from "fs";

export function transformMonsterAbility(
  ability: string,
  value: number,
  ldoDataset = createLdoDataset(),
): MonsterAbility {
  return ldoDataset.usingType(MonsterAbilityShapeType).fromJson({
    abilityScore: ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(dataUrl("ability-scores", ability)),
    value,
  });
}

export function transformMonster(
  data: components["schemas"]["Monster"],
  ldoDataset = createLdoDataset(),
): Monster {
  const monster = ldoDataset
    .usingType(MonsterShapeType)
    .fromSubject(`#${data.index}`);
  monster.type = type("Monster");
  monster.label = data.name;
  monster.monsterAbilities = [
    transformMonsterAbility("str", data.strength, ldoDataset),
    transformMonsterAbility("dex", data.dexterity, ldoDataset),
    transformMonsterAbility("con", data.constitution, ldoDataset),
    transformMonsterAbility("int", data.intelligence, ldoDataset),
    transformMonsterAbility("wis", data.wisdom, ldoDataset),
    transformMonsterAbility("cha", data.charisma, ldoDataset),
  ];
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
