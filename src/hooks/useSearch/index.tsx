import MiniSearch from "minisearch";
import useListOfType from "../useListOfType";
import {
  ClassShapeType,
  EquipmentShapeType,
  MagicSchoolShapeType,
  MonsterShapeType,
  RaceShapeType,
  RuleSectionShapeType,
  RuleShapeType,
  SkillShapeType,
  SpellShapeType,
  SubclassShapeType,
  SubraceShapeType,
} from "../../ldo/dnd5e.shapeTypes";
import { type DependencyList, useEffect } from "react";
import type { ShapeType } from "@ldo/ldo";
import { useLocalization } from "@fluent/react";

function useIndexer<Type>(
  shapeType: ShapeType<Type>,
  rulesBundle: string,
  type: string,
  indexFn: (item: Type) => void,
  ...deps: Array<DependencyList>
) {
  const { isLoading, items } = useListOfType(shapeType, rulesBundle, type);
  useEffect(() => items.forEach(indexFn), [items, isLoading, indexFn, ...deps]);
  return { isLoading, items };
}

export default function useSearch() {
  const { l10n } = useLocalization();
  const search = new MiniSearch({
    fields: ["title"],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
    },
    storeFields: ["title", "text", "type", "url"],
  });

  const { isLoading: classesLoading } = useIndexer(
    ClassShapeType,
    "classes",
    "Class",
    (classInfo) =>
      !search.has(classInfo["@id"]) &&
      (() => {
        search.add({
          id: classInfo["@id"],
          type: "class",
          title: classInfo.label,
          text: classInfo.description,
          url: `/classes/${btoa(classInfo["@id"])}`,
        });
        search.add({
          id: `${classInfo["@id"]}-spells`,
          type: "spells",
          title: classInfo.label,
          text: l10n.getString("spellsFor", { type: classInfo.label }),
          url: `/spells/?class=${btoa(classInfo["@id"])}`,
        });
      })(),
  );

  const { isLoading: equipmentLoading } = useIndexer(
    EquipmentShapeType,
    "equipments",
    "Equipment",
    (equipment) =>
      !search.has(equipment["@id"]) &&
      (() => {
        if (!equipment.armor && !equipment.weapon && !equipment.magicItem) {
          search.add({
            id: equipment["@id"],
            type: "equipment",
            title: equipment.label,
            text: equipment.description,
            url: `/equipment/${btoa(equipment["@id"])}`,
          });
        }
        if (equipment.armor) {
          search.add({
            id: equipment["@id"],
            type: "armor",
            title: equipment.label,
            text: equipment.description,
            url: `/armor/${btoa(equipment["@id"])}`,
          });
        }
        if (equipment.magicItem) {
          search.add({
            id: equipment["@id"],
            type: "magicItem",
            title: equipment.label,
            text: equipment.description,
            url: `/magic-items/${btoa(equipment["@id"])}`,
          });
        }
        if (equipment.weapon) {
          search.add({
            id: equipment["@id"],
            type: "weapon",
            title: equipment.label,
            text: equipment.description,
            url: `/weapons/${btoa(equipment["@id"])}`,
          });
        }
      })(),
  );

  const { isLoading: monstersLoading } = useIndexer(
    MonsterShapeType,
    "monsters",
    "Monster",
    (monster) =>
      !search.has(monster["@id"]) &&
      (() => {
        search.add({
          id: monster["@id"],
          type: "monster",
          title: monster.label,
          text:
            monster.description ||
            l10n.getString("descriptionOf", { type: monster.label }),
          url: `/monsters/${btoa(monster["@id"])}`,
        });
      })(),
  );

  const { isLoading: racesLoading } = useIndexer(
    RaceShapeType,
    "races",
    "Race",
    (race) =>
      !search.has(race["@id"]) &&
      (() => {
        search.add({
          id: race["@id"],
          type: "race",
          title: race.label,
          text: race.description,
          url: `/races/${btoa(race["@id"])}`,
        });
      })(),
  );

  const { isLoading: ruleSectionsLoading } = useIndexer(
    RuleSectionShapeType,
    "rules",
    "RuleSection",
    (section) =>
      !search.has(section["@id"]) &&
      (() => {
        search.add({
          id: section["@id"],
          type: "rule",
          title: section.label,
          text: section.description,
          url: `/rules#${btoa(section["@id"])}`,
        });
      })(),
  );

  const { isLoading: rulesLoading } = useIndexer(
    RuleShapeType,
    "rules",
    "Rule",
    (rule) =>
      !search.has(rule["@id"]) &&
      (() => {
        search.add({
          id: rule["@id"],
          type: "rule",
          title: rule.label,
          text: rule.description,
          url: `/rules#${btoa(rule["@id"])}`,
        });
      })(),
  );
  const { isLoading: skillsLoading } = useIndexer(
    SkillShapeType,
    "skills",
    "Skill",
    (skill) =>
      !search.has(skill["@id"]) &&
      search.add({
        id: skill["@id"],
        type: "skill",
        title: skill.label,
        text: skill.description,
        url: `/skills/${btoa(skill["@id"])}`,
      }),
  );

  const { isLoading: spellLoading } = useIndexer(
    SpellShapeType,
    "spells",
    "Spell",
    (spell) =>
      !search.has(spell["@id"]) &&
      search.add({
        id: spell["@id"],
        type: "spell",
        title: spell.label,
        text: spell.description,
        url: `/spells/${btoa(spell["@id"])}`,
      }),
  );

  const { isLoading: schoolsLoading } = useIndexer(
    MagicSchoolShapeType,
    "spells",
    "MagicSchool",
    (school) =>
      !search.has(school["@id"]) &&
      (() => {
        search.add({
          id: school["@id"],
          type: "school",
          title: school.label,
          text: l10n.getString("spellsFor", { type: school.label }),
          url: `/spells/?school=${btoa(school["@id"])}`,
        });
      })(),
  );

  const { isLoading: subclassesLoading } = useIndexer(
    SubclassShapeType,
    "classes",
    "Subclass",
    (subclass) =>
      !search.has(subclass["@id"]) &&
      (() => {
        search.add({
          id: subclass["@id"],
          type: "subclass",
          title: subclass.label,
          text: subclass.description,
          url: `/classes/${btoa(subclass.class["@id"])}#${btoa(subclass["@id"])}`,
        });
      })(),
  );

  const { isLoading: subracesLoading } = useIndexer(
    SubraceShapeType,
    "races",
    "Subrace",
    (subrace) =>
      !search.has(subrace["@id"]) &&
      (() => {
        search.add({
          id: subrace["@id"],
          type: "subrace",
          title: subrace.label,
          text: subrace.description,
          url: `/races/${btoa(subrace.race["@id"])}#${btoa(subrace["@id"])}`,
        });
      })(),
  );

  return {
    isLoading:
      classesLoading ||
      equipmentLoading ||
      monstersLoading ||
      racesLoading ||
      ruleSectionsLoading ||
      rulesLoading ||
      skillsLoading ||
      spellLoading ||
      schoolsLoading ||
      subclassesLoading ||
      subracesLoading,
    search,
  };
}
