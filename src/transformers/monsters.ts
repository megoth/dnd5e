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
  MonsterProficiencyShapeType,
  MonsterSenseShapeType,
  MonsterShapeType,
  MonsterSpecialAbilityShapeType,
  MonsterSpeedShapeType,
  MonsterSpellcastingShapeType,
  MonsterSpellLevelSlotsShapeType,
  MonsterSpellShapeType,
  MonsterUsageShapeType,
  ProficiencyShapeType,
  SpellShapeType,
} from "../ldo/dnd5e.shapeTypes";
import {
  Monster,
  MonsterAbility,
  MonsterProficiency,
} from "../ldo/dnd5e.typings";
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
import { transformDamage } from "./damage";

function transformMonsterAbility(
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

function transformMonsterAction(
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

function transformMonsterProficiency(
  data: components["schemas"]["MonsterProficiency"],
  ldoDataset = createLdoDataset(),
): MonsterProficiency {
  return ldoDataset.usingType(MonsterProficiencyShapeType).fromJson({
    value: data.value,
    proficiency: ldoDataset
      .usingType(ProficiencyShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.proficiency.url)),
  });
}

function transformMonsterUsage(
  data: components["schemas"]["MonsterUsage"],
  ldoDataset = createLdoDataset(),
) {
  return ldoDataset.usingType(MonsterUsageShapeType).fromJson({
    ofType: data.type,
    restTypes: data.rest_types,
    times: data.times,
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
  monster.alignmentDescription = data.alignment;
  monster.monsterArmorClass = data.armor_class?.map((ac) =>
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
  monster.legendaryActions = data.legendary_actions?.map((action) =>
    transformMonsterAction(action, ldoDataset),
  );
  monster.challengeRating = data.challenge_rating;
  monster.proficiencyBonus = data.proficiency_bonus;
  monster.conditionImmunities = data.condition_immunities?.map((condition) =>
    ldoDataset
      .usingType(ConditionShapeType)
      .fromSubject(apiUrlToSubjectUrl(condition.url)),
  );
  monster.damageImmunities = data.damage_immunities;
  monster.damageResistances = data.damage_resistances;
  monster.damageVulnerabilities = data.damage_vulnerabilities;
  monster.forms = data.forms?.map((form) =>
    ldoDataset
      .usingType(MonsterShapeType)
      .fromSubject(apiUrlToSubjectUrl(form.url)),
  );
  monster.monsterLanguages = data.languages;
  monster.monsterSavingThrows = data.proficiencies
    ?.filter((proficiency) =>
      proficiency.proficiency.url.startsWith(
        "/api/proficiencies/saving-throw-",
      ),
    )
    .map((proficiency) => transformMonsterProficiency(proficiency, ldoDataset));
  monster.monsterSkills = data.proficiencies
    ?.filter((proficiency) =>
      proficiency.proficiency.url.startsWith("/api/proficiencies/skill-"),
    )
    .map((proficiency) => transformMonsterProficiency(proficiency, ldoDataset));
  monster.reactions = data.reactions?.map((reaction) =>
    transformMonsterAction(reaction, ldoDataset),
  );
  monster.senses = ldoDataset.usingType(MonsterSenseShapeType).fromJson({
    passivePerception: data.senses.passive_perception,
    blindsight: data.senses.blindsight,
    darkvision: data.senses.darkvision,
    tremorsense: data.senses.tremorsense,
    truesight: data.senses.truesight,
  });
  monster.specialAbilities = data.special_abilities?.map((ability) =>
    ldoDataset.usingType(MonsterSpecialAbilityShapeType).fromJson({
      label: ability.name,
      description: [ability.desc],
      attackBonus: ability.attack_bonus,
      damage: ability.damage && transformDamage(ability.damage, ldoDataset),
      difficultyClass:
        ability.dc && transformDifficultyClass(ability.dc, ldoDataset),
      monsterSpellcasting:
        ability.spellcasting &&
        ldoDataset.usingType(MonsterSpellcastingShapeType).fromJson({
          abilityScore:
            ability.spellcasting.ability &&
            ldoDataset
              .usingType(AbilityScoreShapeType)
              .fromSubject(
                apiUrlToSubjectUrl(ability.spellcasting.ability.url),
              ),
          dcValue: ability.spellcasting.dc,
          modifier: ability.spellcasting.modifier,
          componentsRequired: ability.spellcasting.components_required,
          spellcastingSchool: ability.spellcasting.school,
          spellcastingSlots:
            ability.spellcasting.slots &&
            Object.entries(ability.spellcasting.slots).map(([level, slots]) =>
              ldoDataset.usingType(MonsterSpellLevelSlotsShapeType).fromJson({
                level: parseInt(level, 10),
                slots,
              }),
            ),
          monsterSpells: ability.spellcasting.spells?.map((spell) =>
            ldoDataset.usingType(MonsterSpellShapeType).fromJson({
              label: spell.name,
              level: spell.level,
              spell: ldoDataset
                .usingType(SpellShapeType)
                .fromSubject(apiUrlToSubjectUrl(spell.url)),
              monsterSpellUsage:
                spell.usage && transformMonsterUsage(spell.usage, ldoDataset),
            }),
          ),
        }),
      monsterUsage:
        ability.usage && transformMonsterUsage(ability.usage, ldoDataset),
    }),
  );
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
