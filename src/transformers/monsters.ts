import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  ConditionShapeType,
  EquipmentShapeType,
  MonsterAbilityShapeType,
  MonsterActionShapeType,
  MonsterArmorClassShapeType,
  MonsterMultiAttackActionShapeType,
  MonsterShapeType,
  MonsterSpeedShapeType,
  SpellShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Monster, MonsterAbility } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import monsters from "../dnd5eapi-data/5e-SRD-Monsters.json";
import { writeFileSync } from "node:fs";
import {
  addendumPath,
  apiUrlToSubjectUrl,
  dataPath,
  dataUrl,
} from "../utils/dnd5e";
import { readFileSync } from "fs";
import { transformChoice } from "./choice";
import { transformDifficultyClass } from "./difficultyClass";

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

export function transformMonsterAction(
  data: components["schemas"]["MonsterAction"],
  ldoDataset = createLdoDataset(),
) {
  return ldoDataset.usingType(MonsterActionShapeType).fromJson({
    label: data.name,
    description: [data.desc],
    actionOptions:
      data.action_options && transformChoice(data.action_options, ldoDataset),
    monsterMultiAttackActions:
      data.actions &&
      data.actions.map((action) =>
        ldoDataset.usingType(MonsterMultiAttackActionShapeType).fromJson({
          label: action.action_name,
          count: action.count,
          ofType: action.type,
        }),
      ),
    monsterActionOptions:
      data.options && transformChoice(data.options, ldoDataset),
    multiattackType: data.multiattack_type,
    attackBonus: data.attack_bonus,
    difficultyClass: data.dc && transformDifficultyClass(data.dc, ldoDataset),
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
  monster.monsterArmorClass = data.armor_class.map((ac) =>
    ldoDataset.usingType(MonsterArmorClassShapeType).fromJson({
      ofType: ac.type,
      value: ac.value,
      description: [ac.desc],
      ...(ac["armor"] && {
        armorList: ac["armor"].map(
          (armor: components["schemas"]["APIReference"]) =>
            ldoDataset
              .usingType(EquipmentShapeType)
              .fromSubject(apiUrlToSubjectUrl(armor.url)),
        ),
      }),
      ...(ac["spell"] && {
        spell: ldoDataset
          .usingType(SpellShapeType)
          .fromSubject(apiUrlToSubjectUrl(ac["spell"].url)),
      }),
      ...(ac["condition"] && {
        condition: ldoDataset
          .usingType(ConditionShapeType)
          .fromSubject(apiUrlToSubjectUrl(ac["condition"].url)),
      }),
    }),
  );
  monster.hitPoints = data.hit_points;
  monster.hitDice = data.hit_dice;
  monster.hitPointsRoll = data.hit_points_roll;
  monster.monsterActions =
    data.actions &&
    data.actions.map((action) => transformMonsterAction(action, ldoDataset));
  monster.legendaryActions =
    data.legendary_actions &&
    data.legendary_actions.map((action) =>
      transformMonsterAction(action, ldoDataset),
    );
  monster.challengeRating = data.challenge_rating;
  monster.proficiencyBonus = data.proficiency_bonus;
  // conditionImmunities
  monster.damageImmunities = data.damage_immunities;
  monster.damageResistances = data.damage_resistances;
  monster.damageVulnerabilities = data.damage_vulnerabilities;
  monster.forms =
    data.forms &&
    data.forms.map((form) =>
      ldoDataset
        .usingType(MonsterShapeType)
        .fromSubject(apiUrlToSubjectUrl(form.url)),
    );
  monster.monsterLanguages = data.languages;
  // monsterProficiencies
  monster.reactions =
    data.reactions &&
    data.reactions.map((reaction) =>
      transformMonsterAction(reaction, ldoDataset),
    );
  // senses
  // specialAbilities
  monster.monsterSpeed =
    data.speed &&
    ldoDataset.usingType(MonsterSpeedShapeType).fromJson({
      walk: data.speed.walk,
      burrow: data.speed.burrow,
      climb: data.speed.climb,
      fly: data.speed.fly,
      swim: data.speed.swim,
    });
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
