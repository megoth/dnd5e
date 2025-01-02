import { Choice, Class } from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";

export function choiceLabels(choice: Choice): string {
  return [
    ...(choice.from.choices?.flatMap((option) => choiceLabels(option.choice)) ||
      []),
    ...(choice.from.counts?.flatMap(
      (option) => `${option.count}x ${option.of.label}`,
    ) || []),
    choice.from.equipmentCategory?.label,
    ...(choice.from.references?.map(
      (reference) =>
        reference.proficiency?.label ||
        reference.language?.label ||
        reference.spell?.label ||
        reference.equipment?.label,
    ) || []),
  ].join(", ");
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
  ];
}

export function dataPath(type: string): string {
  // only used backend
  return `${process.cwd()}/public/data/${type}.ttl`;
}

export function dataUrl(type: string, id: string = ""): string {
  return `/data/${type}.ttl#${id}`;
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e.ttl#${id}`;
}
