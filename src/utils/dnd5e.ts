import {
  ArmorClass,
  Background,
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
  Proficiency,
  Race,
  Spell,
  StartingEquipment,
} from "../ldo/dnd5e.typings";
import { resourceUrl } from "./url";
import { ReactLocalization } from "@fluent/react/esm/localization";
import { removeDuplicates } from "./array";
import { LdoBase, ShapeType } from "@ldo/ldo";
import { CharacterShapeType, LanguageShapeType } from "../ldo/dnd5e.shapeTypes";
import { SolidLdoDataset } from "@ldo/solid";
import { namedNode } from "@rdfjs/data-model";

export function dataUrl(type: string, id: string = ""): string {
  return `/data/${type}.ttl#${id}`;
}

export function isLocal(subject?: LdoBase): boolean {
  return subject?.["@id"] && !resourceUrl(subject["@id"]);
}

export function modifier(value: number): string {
  return value > 0 ? `+${value}` : value.toString();
}

export function vocabUrl(id: string): string {
  return `https://dnd5e.app/vocab/dnd5e#${id}`;
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

export function choiceLabels(
  choice: Choice,
  dataset: SolidLdoDataset,
): string[][] {
  return choice.from
    ? [
        // TODO: abilityScores
        // TODO: actions
        // TODO: bonuses
        // TODO: breaths
        ...(choice.from.choiceOptions || []).flatMap((option) =>
          choiceLabels(option.choice, dataset),
        ),
        // TODO: damageOptions
        choice.from.equipmentCategory?.label && [
          `${choice.from.equipmentCategory.label} (${(choice.from.equipmentCategory.equipmentList || []).map((equipment) => equipment.label).join(", ")})`,
        ],
        (choice.from.equipmentOptions || []).map(
          (option) =>
            `${choice.choose > 1 ? `${option.count} ` : ""}${option.equipment.label}`,
        ),
        choice.from.idealOptions.map((ideal) => ideal.description),
        // TODO: multiples
        choice.from.ofType
          ? ((ofType): string[] => {
              switch (ofType) {
                case "languages":
                  return dataset
                    .match(null, null, namedNode(vocabUrl("Language")))
                    .toArray()
                    .map((quad) =>
                      dataset
                        .usingType(LanguageShapeType)
                        .fromSubject(quad.subject.value.toString()),
                    )
                    .map((language) => language.label);
              }
              return [];
            })(choice.from.ofType)
          : [],
        (choice.from.referenceOptions || []).map(
          (reference) =>
            reference.proficiency?.skill?.label ||
            reference.proficiency?.label ||
            reference.language?.label ||
            reference.spell?.label ||
            reference.equipment?.label,
        ),
        (choice.from.stringOptions || []).map((string) => string.string),
      ].filter((labels) => labels?.length > 0)
    : [];
}

export function choiceResourceUrls(
  choice: Choice,
  dataset: SolidLdoDataset,
): string[] {
  return choice.from
    ? removeDuplicates(
        [
          ...(choice.from.abilityScoreOptions?.map(
            (score) => score.abilityScore["@id"],
          ) || []),
          // actions - do not need to load resources
          ...(choice.from.bonusOptions || []).map(
            (bonus) => bonus.abilityScore["@id"],
          ),
          ...(choice.from.breathOptions || []).flatMap((breath) => [
            breath.difficultyClass?.dcType["@id"],
            ...(breath.breathDamage || []).map(
              (damage) => damage.damageType["@id"],
            ),
          ]),
          ...(choice.from.choiceOptions?.flatMap((option) =>
            choiceResourceUrls(option.choice, dataset),
          ) || []),
          // damageOptions - do not need to load resources
          choice.from.equipmentCategory?.["@id"],
          ...(choice.from.referenceOptions?.map(
            (reference) =>
              reference.proficiency["@id"] ||
              reference.spell["@id"] ||
              reference.language["@id"] ||
              reference.equipment["@id"],
          ) || []),
          ...(choice.from.equipmentOptions || []).flatMap(
            (option) => option.equipment["@id"],
          ),
          ...(choice.from.idealOptions || []).flatMap((ideal) =>
            (ideal.alignments || []).map((alignment) => alignment["@id"]),
          ),
          // TODO: multiples
          ...(choice.from.ofType
            ? ((ofType): string[] => {
                switch (ofType) {
                  case "languages":
                    return [location.origin + dataUrl("languages")];
                }
                return [];
              })(choice.from.ofType)
            : []),
          // TODO: references
          // strings - do not need to load resources
        ]
          .filter((url) => !!url)
          .map((url) => resourceUrl(url)),
      )
    : [];
}

export function backgroundResourceUrls(
  background: Background,
  dataset: SolidLdoDataset,
): string[] {
  return removeDuplicates([
    ...(background.bonds ? choiceResourceUrls(background.bonds, dataset) : []),
    ...(background.flaws ? choiceResourceUrls(background.flaws, dataset) : []),
    ...(background.ideals
      ? choiceResourceUrls(background.ideals, dataset)
      : []),
    ...(background.illustration
      ? [resourceUrl(background.illustration["@id"])]
      : []),
    ...(background.languageChoice
      ? choiceResourceUrls(background.languageChoice, dataset)
      : []),
    ...(background.personalityTraits
      ? choiceResourceUrls(background.personalityTraits, dataset)
      : []),
    ...(background.startingEquipment || []).map(
      (startingEquipment) => startingEquipment.equipment["@id"],
    ),
    ...(background.startingEquipmentChoices || []).flatMap((choice) =>
      choiceResourceUrls(choice, dataset),
    ),
    ...(background.startingProficiencies || []).map((proficiency) =>
      resourceUrl(proficiency["@id"]),
    ),
    ...(background.startingProficiencies || [])
      .filter((proficiency) => !!proficiency.skill)
      .map((proficiency) => resourceUrl(proficiency.skill["@id"])),
  ]);
}

export function classResourceUrls(
  classInfo: Class,
  dataset: SolidLdoDataset,
): string[] {
  return removeDuplicates([
    ...(classInfo.proficiencies || []).map((proficiency) =>
      resourceUrl(proficiency["@id"]),
    ),
    ...(classInfo.proficiencyChoices || []).flatMap((choice) =>
      choiceResourceUrls(choice, dataset),
    ),
    ...(classInfo.savingThrows || []).map((savingThrow) =>
      resourceUrl(savingThrow["@id"]),
    ),
    ...(classInfo.startingEquipment || []).map((startingEquipment) =>
      resourceUrl(startingEquipment.equipment["@id"]),
    ),
    ...(classInfo.startingEquipmentChoices || []).flatMap((option) =>
      choiceResourceUrls(option, dataset),
    ),
    ...(classInfo.levels || []).map((level) => resourceUrl(level["@id"])),
    ...(classInfo.levels || []).flatMap((level) =>
      level.features.map((feature) => resourceUrl(feature["@id"])),
    ),
    ...(classInfo.multiclassing?.prerequisites.map((prerequisite) =>
      resourceUrl(prerequisite.abilityScore["@id"]),
    ) || []),
    ...(classInfo.multiclassing?.prerequisiteChoice
      ? choiceResourceUrls(classInfo.multiclassing?.prerequisiteChoice, dataset)
      : []),
    ...classInfo.subclasses.map((subclass) => resourceUrl(subclass["@id"])),
    ...(classInfo.illustration
      ? [resourceUrl(classInfo.illustration["@id"])]
      : []),
  ]);
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

export function apiUrlToSubjectUrl(apiUrl: string): string {
  const [_, type, id] = apiUrl.match(/api\/(\S+)\/(\S+)/);
  return dataUrl(type, id);
}

export function description(texts: string[] = []): string {
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
  return removeDuplicates([
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
  ]);
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

export function proficiencyName(proficiency: Proficiency): string {
  return proficiency.skill?.label || proficiency.label;
}

export function rageCount(count: number): string {
  return count === 9999 ? "Unlimited" : count.toString();
}

export function raceResources(race: Race): string[] {
  return removeDuplicates([
    ...(race.abilityBonuses || []).map((bonus) =>
      resourceUrl(bonus.abilityScore["@id"]),
    ),
    ...(race.languages || []).map((language) => resourceUrl(language["@id"])),
    ...(race.subraces || []).map((subrace) => resourceUrl(subrace["@id"])),
    ...(race.traits || []).map((trait) => resourceUrl(trait["@id"])),
    ...(race.illustration ? [resourceUrl(race.illustration["@id"])] : []),
  ]);
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

export function startingEquipmentName(
  startingEquipment: StartingEquipment,
): string {
  return `${startingEquipment.quantity > 1 ? `${startingEquipment.quantity} ` : ""}${startingEquipment.equipment.label}`;
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

export const shapeMap: Record<string, ShapeType<LdoBase>> = {
  [vocabUrl("Character")]: CharacterShapeType,
};

export function weight(weight: number) {
  return `${weight} lb.`;
}
