import MiniSearch from "minisearch";
import useListOfType from "../useListOfType";
import { ClassShapeType, SpellShapeType } from "../../ldo/dnd5e.shapeTypes";
import { type DependencyList, useEffect } from "react";
import type { ShapeType } from "@ldo/ldo";

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
          url: `/classes/${btoa(classInfo["@id"])}`,
        });
        search.add({
          id: `${classInfo["@id"]}-spells`,
          type: "spells",
          title: classInfo.label,
          url: `/spells/?class=${btoa(classInfo["@id"])}`,
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

  const isLoading = classesLoading || spellLoading;

  return {
    isLoading,
    search,
  };
}
