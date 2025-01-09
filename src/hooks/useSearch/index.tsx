import MiniSearch from "minisearch";
import useListOfType from "../useListOfType";
import {
  ClassShapeType,
  EquipmentShapeType,
  MagicSchoolShapeType,
  RaceShapeType,
  SpellShapeType,
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
          text: [l10n.getString("descriptionOf", { type: classInfo.label })],
          url: `/classes/${btoa(classInfo["@id"])}`,
        });
        search.add({
          id: `${classInfo["@id"]}-spells`,
          type: "spells",
          title: classInfo.label,
          text: [l10n.getString("spellsFor", { type: classInfo.label })],
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
        search.add({
          id: equipment["@id"],
          type: "equipment",
          title: equipment.label,
          url: `/equipment#${btoa(equipment["@id"])}`,
        });
        if (equipment.weapon) {
          search.add({
            id: `${equipment["@id"]}-weapon`,
            type: "weapon",
            title: equipment.label,
            url: `/weapons#${btoa(equipment["@id"])}`,
          });
        }
        if (equipment.armor) {
          search.add({
            id: `${equipment["@id"]}-armor`,
            type: "armor",
            title: equipment.label,
            url: `/armor#${btoa(equipment["@id"])}`,
          });
        }
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
          text: [l10n.getString("descriptionOf", { type: race.label })],
          url: `/races/${btoa(race["@id"])}`,
        });
      })(),
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
          text: [l10n.getString("spellsFor", { type: school.label })],
          url: `/spells/?school=${btoa(school["@id"])}`,
        });
      })(),
  );

  return {
    isLoading:
      classesLoading ||
      equipmentLoading ||
      racesLoading ||
      spellLoading ||
      schoolsLoading,
    search,
  };
}
