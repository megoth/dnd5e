import MiniSearch from "minisearch";
import useListOfType from "../useListOfType";
import {
  BackgroundShapeType,
  CharacterShapeType,
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
import { useEffect } from "react";
import type { ShapeType } from "@ldo/ldo";
import { useLocalization } from "@fluent/react";
import useStorage from "../useStorage";

type IndexDocument = {
  id: string;
  title: string;
};

function useIndexer<Type>(
  shapeType: ShapeType<Type>,
  rulesBundle: string,
  type: string,
  search: MiniSearch<IndexDocument>,
  indexFn: (item: Type) => IndexDocument,
  filterFn: (item: Type) => boolean = () => true,
) {
  const { isLoading, items } = useListOfType(shapeType, rulesBundle, type);
  useEffect(
    () =>
      items
        .filter(filterFn)
        .forEach((item) =>
          ((indexDocument) =>
            search.has(indexDocument.id)
              ? search.replace(indexDocument)
              : search.add(indexDocument))(indexFn(item)),
        ),
    [items, isLoading, indexFn],
  );
  return { isLoading, items };
}

export default function useSearch() {
  const { isLoading: storageLoading } = useStorage();
  const { l10n } = useLocalization();
  const search = new MiniSearch({
    fields: ["title"],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
    },
    storeFields: ["title", "text", "type", "url"],
  });

  const { isLoading: armorLoading } = useIndexer(
    EquipmentShapeType,
    "equipments",
    "Equipment",
    search,
    (equipment) => ({
      id: equipment["@id"],
      type: "armor",
      title: equipment.label,
      text: equipment.description,
      url: `/armor/${btoa(equipment["@id"])}`,
    }),
    (equipment) => !!equipment.armor,
  );

  const { isLoading: backgroundsLoading } = useIndexer(
    BackgroundShapeType,
    "characters",
    "Background",
    search,
    (background) => ({
      id: background["@id"],
      type: "background",
      title: background.label,
      text: l10n.getString("descriptionOf", { type: background.label }),
      url: `/backgrounds/${btoa(background["@id"])}`,
    }),
  );

  const { isLoading: charactersLoading } = useIndexer(
    CharacterShapeType,
    "characters",
    "Character",
    search,
    (character) => ({
      id: character["@id"],
      type: "character",
      title: character.label,
      text: l10n.getString("descriptionOf", { type: character.label }),
      url: `/characters/${btoa(character["@id"])}`,
    }),
  );

  const { isLoading: classesLoading } = useIndexer(
    ClassShapeType,
    "classes",
    "Class",
    search,
    (classInfo) => ({
      id: classInfo["@id"],
      type: "class",
      title: classInfo.label,
      text: classInfo.description,
      url: `/classes/${btoa(classInfo["@id"])}`,
    }),
  );

  const { isLoading: classSpellsLoading } = useIndexer(
    ClassShapeType,
    "classes",
    "Class",
    search,
    (classInfo) => ({
      id: `${classInfo["@id"]}-spells`,
      type: "spells",
      title: classInfo.label,
      text: l10n.getString("spellsFor", { type: classInfo.label }),
      url: `/spells/?class=${btoa(classInfo["@id"])}`,
    }),
  );

  const { isLoading: equipmentLoading } = useIndexer(
    EquipmentShapeType,
    "equipments",
    "Equipment",
    search,
    (equipment) => ({
      id: equipment["@id"],
      type: "equipment",
      title: equipment.label,
      text: equipment.description,
      url: `/equipment/${btoa(equipment["@id"])}`,
    }),
    (equipment) =>
      !equipment.armor && !equipment.weapon && !equipment.magicItem,
  );

  const { isLoading: magicItemsLoading } = useIndexer(
    EquipmentShapeType,
    "equipments",
    "Equipment",
    search,
    (equipment) => ({
      id: equipment["@id"],
      type: "magicItem",
      title: equipment.label,
      text: equipment.description,
      url: `/magic-items/${btoa(equipment["@id"])}`,
    }),
    (equipment) => !!equipment.magicItem,
  );

  const { isLoading: monstersLoading } = useIndexer(
    MonsterShapeType,
    "monsters",
    "Monster",
    search,
    (monster) => ({
      id: monster["@id"],
      type: "monster",
      title: monster.label,
      text:
        monster.description ||
        l10n.getString("descriptionOf", { type: monster.label }),
      url: `/monsters/${btoa(monster["@id"])}`,
    }),
  );

  const { isLoading: racesLoading } = useIndexer(
    RaceShapeType,
    "races",
    "Race",
    search,
    (race) => ({
      id: race["@id"],
      type: "race",
      title: race.label,
      text: race.description,
      url: `/races/${btoa(race["@id"])}`,
    }),
  );

  const { isLoading: ruleSectionsLoading } = useIndexer(
    RuleSectionShapeType,
    "rules",
    "RuleSection",
    search,
    (section) => ({
      id: section["@id"],
      type: "rule",
      title: section.label,
      text: section.description,
      url: `/rules#${btoa(section["@id"])}`,
    }),
  );

  const { isLoading: rulesLoading } = useIndexer(
    RuleShapeType,
    "rules",
    "Rule",
    search,
    (rule) => ({
      id: rule["@id"],
      type: "rule",
      title: rule.label,
      text: rule.description,
      url: `/rules#${btoa(rule["@id"])}`,
    }),
  );
  const { isLoading: skillsLoading } = useIndexer(
    SkillShapeType,
    "skills",
    "Skill",
    search,
    (skill) => ({
      id: skill["@id"],
      type: "skill",
      title: skill.label,
      text: skill.description,
      url: `/skills#${btoa(skill["@id"])}`,
    }),
  );

  const { isLoading: spellLoading } = useIndexer(
    SpellShapeType,
    "spells",
    "Spell",
    search,
    (spell) => ({
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
    search,
    (school) => ({
      id: school["@id"],
      type: "school",
      title: school.label,
      text: l10n.getString("spellsFor", { type: school.label }),
      url: `/spells/?school=${btoa(school["@id"])}`,
    }),
  );

  const { isLoading: subclassesLoading } = useIndexer(
    SubclassShapeType,
    "classes",
    "Subclass",
    search,
    (subclass) => ({
      id: subclass["@id"],
      type: "subclass",
      title: subclass.label,
      text: subclass.description,
      url: `/classes/${btoa(subclass.class["@id"])}#${btoa(subclass["@id"])}`,
    }),
  );

  const { isLoading: subracesLoading } = useIndexer(
    SubraceShapeType,
    "races",
    "Subrace",
    search,
    (subrace) => ({
      id: subrace["@id"],
      type: "subrace",
      title: subrace.label,
      text: subrace.description,
      url: `/races/${btoa(subrace.race["@id"])}#${btoa(subrace["@id"])}`,
    }),
  );

  const { isLoading: weaponsLoading } = useIndexer(
    EquipmentShapeType,
    "equipments",
    "Equipment",
    search,
    (equipment) => ({
      id: equipment["@id"],
      type: "weapon",
      title: equipment.label,
      text: equipment.description,
      url: `/weapons/${btoa(equipment["@id"])}`,
    }),
    (equipment) => !!equipment.weapon,
  );

  return {
    isLoading:
      armorLoading ||
      backgroundsLoading ||
      charactersLoading ||
      classesLoading ||
      classSpellsLoading ||
      equipmentLoading ||
      magicItemsLoading ||
      monstersLoading ||
      racesLoading ||
      ruleSectionsLoading ||
      rulesLoading ||
      skillsLoading ||
      spellLoading ||
      schoolsLoading ||
      storageLoading ||
      subclassesLoading ||
      subracesLoading ||
      weaponsLoading,
    search,
  };
}
