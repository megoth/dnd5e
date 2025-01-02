import { Choice, Class } from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";

export function classHasRage(classInfo: Class): boolean {
  return !!classInfo.levels.find((level) => !!level.classSpecific?.rageCount);
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

export function rageCount(count: string): string {
  return parseInt(count, 10) === 9999 ? "Unlimited" : count;
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}
