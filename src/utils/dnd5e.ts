import {
  ArmorClass,
  Choice,
  Class,
  Cost,
  Damage,
  Equipment,
  Level,
  Monster,
  MonsterAbility,
  MonsterArmorClass,
  MonsterSense,
  MonsterSpeed,
  Race,
  Spell,
} from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";
import { ReactLocalization } from "@fluent/react/esm/localization";
import { removeDuplicates } from "./array";
import { subClassOf } from "rdf-namespaces/dist/rdfs";

export function modifier(value: number): string {
  return value > 0 ? `+${value}` : value.toString();
}

export function scoreModifier(abilityScore: number): string {
  return modifier(Math.floor((abilityScore - 10) / 2));
}

export function ability(abilityScore: number): string {
  return `${abilityScore} (${scoreModifier(abilityScore)})`;
}

export function addendumPath(type: string): string {
  // only used backend
  return `${process.cwd()}/src/transformers/${type}-addendum.ttl`;
}

export function armorClass(ac: ArmorClass, l10n: ReactLocalization): string {
  return [
    ac.base,
    ...(ac.dexBonus ? [`+ ${l10n.getString("dex")}`] : []),
    ...(ac.maxBonus ? [`(${l10n.getString("max")} ${ac.maxBonus})`] : []),
  ].join(" ");
}

export function classHasCantripsKnown(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => level.levelSpellcasting?.cantripsKnown > 0,
  );
}

export function classHasHigherSpellcasting(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => level.levelSpellcasting?.spellSlotsLevel6 > 0,
  );
}

export function classHasInvocations(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => !!level.classSpecific?.invocationsKnown,
  );
}

export function classHasLowerSpellcasting(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.levelSpellcasting);
}

export function classHasMartialArts(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.classSpecific?.martialArts);
}

export function classHasRage(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.classSpecific?.rageCount);
}

export function classHasSneakAttack(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.classSpecific?.sneakAttack);
}

export function classHasSorceryPoints(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => !!level.classSpecific?.sorceryPoints,
  );
}

export function classHasSpellcasting(classInfo: Class): boolean {
  return !!classInfo.classSpellcasting;
}

export function classHasSpellsKnown(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => level.levelSpellcasting?.spellsKnown > 0,
  );
}

export function choiceLabels(choice: Choice) {
  return [
    choice.from.choices?.flatMap((option) => choiceLabels(option.choice)),
    choice.from.counts?.map(
      (option) =>
        `${choice.choose > 1 ? `${option.count} ` : ""}${option.of.label}`,
    ),
    choice.from.equipmentCategory?.label && [
      `${choice.from.equipmentCategory.label} (${choice.from.equipmentCategory.equipmentList.map((equipment) => equipment.label).join(", ")})`,
    ],
    choice.from.references?.map(
      (reference) =>
        reference.proficiency?.label ||
        reference.language?.label ||
        reference.spell?.label ||
        reference.equipment?.label,
    ),
  ].filter((labels) => labels?.length > 0);
}

export function choiceResourceUrls(choice: Choice): string[] {
  return [
    ...(choice.from?.abilityScores?.map((score) => score.abilityScore["@id"]) ||
      []),
    ...(choice.from?.choices?.flatMap((option) =>
      choiceResourceUrls(option.choice),
    ) || []),
    ...(choice.from.counts?.flatMap((option) => option.of["@id"]) || []),
    choice.from.equipmentCategory?.["@id"],
    ...(choice.from?.references?.map(
      (reference) =>
        reference.proficiency["@id"] ||
        reference.spell["@id"] ||
        reference.language["@id"] ||
        reference.equipment["@id"],
    ) || []),
  ]
    .filter((url) => !!url)
    .map((url) => resourceUrl(url));
}

export function classResourceUrls(classInfo: Class): string[] {
  return [
    ...(classInfo.proficiencies || []).map((proficiency) =>
      resourceUrl(proficiency["@id"]),
    ),
    ...(classInfo.proficiencyChoices || []).flatMap((choice) =>
      choiceResourceUrls(choice),
    ),
    ...(classInfo.savingThrows || []).map((savingThrow) =>
      resourceUrl(savingThrow["@id"]),
    ),
    ...(classInfo.startingEquipment || []).map((startingEquipment) =>
      resourceUrl(startingEquipment.equipment["@id"]),
    ),
    ...(classInfo.startingEquipmentOptions || []).flatMap((option) =>
      choiceResourceUrls(option),
    ),
    ...(classInfo.levels || []).map((level) => resourceUrl(level["@id"])),
    ...(classInfo.levels || []).flatMap((level) =>
      level.features.map((feature) => resourceUrl(feature["@id"])),
    ),
    ...(classInfo.multiclassing?.prerequisites.map((prerequisite) =>
      resourceUrl(prerequisite.abilityScore["@id"]),
    ) || []),
    ...(classInfo.multiclassing?.prerequisiteOptions
      ? choiceResourceUrls(classInfo.multiclassing?.prerequisiteOptions)
      : []),
    ...classInfo.subclasses.map((subclass) => resourceUrl(subclass["@id"])),
    ...(classInfo.illustration
      ? [resourceUrl(classInfo.illustration["@id"])]
      : []),
  ];
}

export function cost(cost?: Cost): string {
  return cost ? `${cost.quantity} ${cost.unit}` : "-";
}

export function damage(damage: Damage): string {
  return `${damage.dice} ${damage.damageType.label}`;
}

export function dataPath(type: string): string {
  // only used backend
  return `${process.cwd()}/public/data/${type}.ttl`;
}

export function dataUrl(type: string, id: string = ""): string {
  return `/data/${type}.ttl#${id}`;
}

export function apiUrlToSubjectUrl(apiUrl: string): string {
  const [_, type, id] = apiUrl.match(/api\/(\S+)\/(\S+)/);
  return dataUrl(type, id);
}

export function description(texts: string[]): string {
  function isParagraph(text: string, nextText?: string): boolean {
    return (
      (text[0] !== "|" || (text[0] === "|" && nextText?.[0] !== "|")) &&
      text[0] !== "-"
    );
  }

  return texts
    .map((text, index) =>
      isParagraph(text, texts[index + 1]) ? `${text}\n` : text,
    )
    .join("\n");
}

export function equipmentResourceUrls(equipment: Equipment): string[] {
  return [
    resourceUrl(equipment.equipmentCategory["@id"]),
    ...(equipment.gear?.gearCategory
      ? [resourceUrl(equipment.gear.gearCategory["@id"])]
      : []),
    ...(equipment.magicItem?.magicItemVariants || []).map((variant) =>
      resourceUrl(variant["@id"]),
    ),
    ...(equipment.weapon?.damage
      ? [resourceUrl(equipment.weapon.damage.damageType["@id"])]
      : []),
    ...(equipment.weapon?.twoHandedDamage
      ? [resourceUrl(equipment.weapon.twoHandedDamage.damageType["@id"])]
      : []),
    ...(equipment.weapon?.properties || []).map((property) =>
      resourceUrl(property["@id"]),
    ),
  ];
}

export function highestSpellLevel(level: Level): number {
  let spellLevel = 9;
  do {
    const hasSpellLevel =
      level.levelSpellcasting[`spellSlotsLevel${spellLevel}`];
    if (hasSpellLevel) {
      return spellLevel;
    }
    spellLevel--;
  } while (spellLevel > 0);
  return spellLevel;
}

export function monsterArmorClass(ac: MonsterArmorClass): string {
  return `${ac.value}${ac.ofType ? ` (${ac.ofType})` : ""}`;
}

export function monsterChallenge(monster: Monster): string {
  return `${monster.challengeRating} (${monster.xp} XP)`;
}

export function monsterHP(monster: Monster): string {
  return `${monster.hitPoints} (${monster.hitPointsRoll})`;
}

export function monsterSpeed(
  speed: MonsterSpeed,
  l10n: ReactLocalization,
): string {
  function getString(type: string): string[] {
    return speed[type] ? [`${l10n.getString(type)} ${speed[type]}`] : [];
  }

  return [
    speed.walk,
    ...getString("burrow"),
    ...getString("climb"),
    ...getString("fly"),
    ...getString("swim"),
  ].join(", ");
}

export function monsterResourceUrls(monster: Monster): string[] {
  return removeDuplicates([
    ...(monster.monsterAbilities || []).map((ability) =>
      resourceUrl(ability.abilityScore["@id"]),
    ),
    ...(monster.conditionImmunities || []).map((condition) =>
      resourceUrl(condition["@id"]),
    ),
    ...(monster.forms || []).map((form) => resourceUrl(form["@id"])),
    ...(monster.monsterSavingThrows || []).map((savingThrow) =>
      resourceUrl(savingThrow.proficiency["@id"]),
    ),
    ...(monster.monsterSavingThrows || []).map(
      (savingThrow) =>
        savingThrow.proficiency?.savingThrow &&
        resourceUrl(savingThrow.proficiency.savingThrow["@id"]),
    ),
    ...(monster.monsterSkills || []).map((skill) =>
      resourceUrl(skill.proficiency["@id"]),
    ),
    ...(monster.monsterSkills || []).map(
      (skill) =>
        skill.proficiency?.skill && resourceUrl(skill.proficiency.skill["@id"]),
    ),
    ...(monster.illustration ? [resourceUrl(monster.illustration["@id"])] : []),
  ]).filter((value) => !!value);
}

export function monsterSavingThrow(
  ability: MonsterAbility,
  monster: Monster,
): string {
  const savingThrow = monster.monsterSavingThrows.find(
    (save) =>
      save.proficiency.savingThrow?.["@id"] === ability.abilityScore["@id"],
  );
  return savingThrow
    ? modifier(savingThrow.value)
    : scoreModifier(ability.value);
}

export function monsterSenses(
  senses: MonsterSense,
  l10n: ReactLocalization,
): string {
  function getString(type: string): string[] {
    return senses[type] ? [`${l10n.getString(type)} ${senses[type]}`] : [];
  }

  return [
    ...getString("truesight"),
    ...getString("blindsight"),
    ...getString("darkvision"),
    ...getString("tremorsense"),
    ...getString("passivePerception"),
  ].join(", ");
}

export function monsterType(monster: Monster): string {
  return `${monster.ofType}${monster.subtype ? ` (${monster.subtype})` : ""}`;
}

export function parseNumber(number: number): string {
  return (number || "-").toString();
}

export function rageCount(count: number): string {
  return count === 9999 ? "Unlimited" : count.toString();
}

export function raceResources(race: Race): string[] {
  return [
    ...(race.abilityBonuses || []).map((bonus) =>
      resourceUrl(bonus.abilityScore["@id"]),
    ),
    ...(race.languages || []).map((language) => resourceUrl(language["@id"])),
    ...(race.subraces || []).map((subrace) => resourceUrl(subrace["@id"])),
    ...(race.traits || []).map((trait) => resourceUrl(trait["@id"])),
    ...(race.illustration ? [resourceUrl(race.illustration["@id"])] : []),
  ];
}

export function spellDuration(spell: Spell, l10n: ReactLocalization): string {
  return spell.concentration
    ? `${l10n.getString("concentration")}, ${spell.duration}`
    : spell.duration;
}

export function spellMaterial(spell: Spell) {
  return spell.material ? `M (${spell.material})` : "M";
}

export function spellResourceUrls(spell: Spell): string[] {
  return [
    resourceUrl(spell.magicSchool["@id"]),
    ...(spell.magicSchool.illustration
      ? [resourceUrl(spell.magicSchool.illustration["@id"])]
      : []),
  ];
}

export function sumSpellSlots(level: Level): number {
  return (
    level.levelSpellcasting.spellSlotsLevel1 +
    level.levelSpellcasting.spellSlotsLevel2 +
    level.levelSpellcasting.spellSlotsLevel3 +
    level.levelSpellcasting.spellSlotsLevel4 +
    level.levelSpellcasting.spellSlotsLevel5 +
    level.levelSpellcasting.spellSlotsLevel6 +
    level.levelSpellcasting.spellSlotsLevel7 +
    level.levelSpellcasting.spellSlotsLevel8 +
    level.levelSpellcasting.spellSlotsLevel9
  );
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}

export function weight(weight: number) {
  return `${weight} lb.`;
}
