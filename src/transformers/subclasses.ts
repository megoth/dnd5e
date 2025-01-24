import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ClassShapeType,
  FeatureShapeType,
  LevelShapeType,
  SpellShapeType,
  SubclassShapeType,
  SubclassSpellShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Subclass } from "../ldo/dnd5e.typings";
import {
  addendumPath,
  apiUrlToSubjectUrl,
  dataPath,
  dataUrl,
  description,
} from "../utils/dnd5e";

import subclasses from "../dnd5eapi-data/5e-SRD-Subclasses.json";
import { levelsForSubclass } from "./levels";
import { readFileSync } from "fs";

function transformSubclass(
  data: components["schemas"]["Subclass"],
  ldoDataset = createLdoDataset(),
): Subclass {
  const subclass = ldoDataset
    .usingType(SubclassShapeType)
    .fromSubject(`#${data.index}`);
  subclass.type = { "@id": "Subclass" };
  subclass.label = data.name;
  subclass.description = description(data.desc);
  subclass.class = ldoDataset
    .usingType(ClassShapeType)
    .fromSubject(apiUrlToSubjectUrl(data.class.url));
  subclass.subclassFlavor = data.subclass_flavor;
  subclass.levels = levelsForSubclass(data.index).map((level) =>
    ldoDataset
      .usingType(LevelShapeType)
      .fromSubject(dataUrl("levels", level.index)),
  );
  subclass.subclassSpells = data.spells?.map((spell) =>
    ldoDataset.usingType(SubclassSpellShapeType).fromJson({
      levelPrerequisites: spell.prerequisites
        .filter((prerequisite) => prerequisite.type === "level")
        .map((prerequisite) =>
          ldoDataset
            .usingType(LevelShapeType)
            .fromSubject(dataUrl("levels", `${prerequisite.index}`)),
        ),
      subclassFeaturePrerequisites: spell.prerequisites
        .filter((prerequisite) => prerequisite.type === "feature")
        .map((prerequisite) =>
          ldoDataset
            .usingType(FeatureShapeType)
            .fromSubject(apiUrlToSubjectUrl(prerequisite.url)),
        ),
      spell: ldoDataset.usingType(SpellShapeType).fromSubject(spell.spell.url),
    }),
  );
  return subclass;
}

export default async function writeSubclasses() {
  const turtle = (
    await Promise.all(
      subclasses.map((subclass) => toTurtle(transformSubclass(subclass))),
    )
  ).reduce((memo, abilityScore) => memo.concat(abilityScore));
  const addendum = readFileSync(addendumPath("subclasses"), "utf-8");
  writeFileSync(dataPath("subclasses"), turtle + addendum);
}
