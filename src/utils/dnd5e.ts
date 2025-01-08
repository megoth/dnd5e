import { Choice, Class, ClassLevel, Spell } from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";
import Translation from "../components/translation";
import React from "react";
import { ReactLocalization } from "@fluent/react/esm/localization";

export function classHasCantripsKnown(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => parseInt(level.levelSpellcasting?.cantripsKnown, 10) > 0,
  );
}

export function classHasHigherSpellcasting(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => parseInt(level.levelSpellcasting?.spellSlotsLevel6, 10) > 0,
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
    (level) => parseInt(level.levelSpellcasting?.spellsKnown, 10) > 0,
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
    ...classInfo.proficiencies.map((proficiency) =>
      resourceUrl(proficiency["@id"]),
    ),
    ...classInfo.proficiencyChoices.flatMap((choice) =>
      choiceResourceUrls(choice),
    ),
    ...classInfo.savingThrows.map((savingThrow) =>
      resourceUrl(savingThrow["@id"]),
    ),
    ...classInfo.startingEquipment.map((startingEquipment) =>
      resourceUrl(startingEquipment.equipment["@id"]),
    ),
    ...classInfo.startingEquipmentOptions.flatMap((option) =>
      choiceResourceUrls(option),
    ),
    ...classInfo.levels.map((level) => resourceUrl(level["@id"])),
    ...classInfo.levels.flatMap((level) =>
      level.features.map((feature) => resourceUrl(feature["@id"])),
    ),
    ...classInfo.multiclassing.prerequisites.map((prerequisite) =>
      resourceUrl(prerequisite.abilityScore["@id"]),
    ),
    ...(classInfo.multiclassing?.prerequisiteOptions
      ? choiceResourceUrls(classInfo.multiclassing?.prerequisiteOptions)
      : []),
  ];
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

export function highestSpellLevel(level: ClassLevel): number {
  let spellLevel = 9;
  do {
    const hasSpellLevel = parseInt(
      level.levelSpellcasting[`spellSlotsLevel${spellLevel}`],
      10,
    );
    if (hasSpellLevel) {
      return spellLevel;
    }
    spellLevel--;
  } while (spellLevel > 0);
  return spellLevel;
}

export function parseNumber(number: string): string {
  return (parseInt(number, 10) || "-").toString();
}

export function rageCount(count: string): string {
  return parseInt(count, 10) === 9999 ? "Unlimited" : count;
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
  return [resourceUrl(spell.magicSchool["@id"])];
}

export function sumSpellSlots(level: ClassLevel): number {
  return (
    parseInt(level.levelSpellcasting.spellSlotsLevel1, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel2, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel3, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel4, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel5, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel6, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel7, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel8, 10) +
    parseInt(level.levelSpellcasting.spellSlotsLevel9, 10)
  );
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}
