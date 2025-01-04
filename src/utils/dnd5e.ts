import { Choice, Class, ClassLevel } from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";

export function classHasCantripsKnown(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => parseInt(level.spellcasting?.cantripsKnown, 10) > 0,
  );
}

export function classHasHigherSpellcasting(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => parseInt(level.spellcasting?.spellSlotsLevel6, 10) > 0,
  );
}

export function classHasInvocations(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => !!level.classSpecific?.invocationsKnown,
  );
}

export function classHasLowerSpellcasting(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.spellcasting);
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

export function classHasSpellsKnown(classInfo: Class): boolean {
  return !!classInfo.levels.find(
    (level) => parseInt(level.spellcasting?.spellsKnown, 10) > 0,
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
  const [_, type, id] = apiUrl.match(/api\/(\w+)\/(\S+)/);
  return dataUrl(type, id);
}

export function highestSpellLevel(level: ClassLevel): number {
  const level9 = parseInt(level.spellcasting.spellSlotsLevel9, 10);
  if (level9 > 0) return 9;
  let spellLevel = 9;
  do {
    const hasSpellLevel = parseInt(
      level.spellcasting[`spellSlotsLevel${spellLevel}`],
      10,
    );
    if (hasSpellLevel) {
      return spellLevel;
    }
    spellLevel--;
  } while (spellLevel > 0);
  return 0;
}

export function parseNumber(number: string): string {
  return (parseInt(number, 10) || "-").toString();
}

export function rageCount(count: string): string {
  return parseInt(count, 10) === 9999 ? "Unlimited" : count;
}

export function sumSpellSlots(level: ClassLevel): number {
  return (
    parseInt(level.spellcasting.spellSlotsLevel1, 10) +
    parseInt(level.spellcasting.spellSlotsLevel2, 10) +
    parseInt(level.spellcasting.spellSlotsLevel3, 10) +
    parseInt(level.spellcasting.spellSlotsLevel4, 10) +
    parseInt(level.spellcasting.spellSlotsLevel5, 10) +
    parseInt(level.spellcasting.spellSlotsLevel6, 10) +
    parseInt(level.spellcasting.spellSlotsLevel7, 10) +
    parseInt(level.spellcasting.spellSlotsLevel8, 10) +
    parseInt(level.spellcasting.spellSlotsLevel9, 10)
  );
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}
