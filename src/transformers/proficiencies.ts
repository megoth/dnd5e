import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  ClassShapeType,
  EquipmentCategoryShapeType,
  EquipmentShapeType,
  ProficiencyShapeType,
  RaceShapeType,
  SkillShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Proficiency } from "../ldo/dnd5e.typings";
import { apiUrlToSubjectUrl, dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import proficiencies from "../dnd5eapi-data/5e-SRD-Proficiencies.json";

export function transformProficiency(
  data: components["schemas"]["Proficiency"],
  ldoDataset = createLdoDataset(),
): Proficiency {
  const proficiency = ldoDataset
    .usingType(ProficiencyShapeType)
    .fromSubject(`#${data.index}`);
  proficiency.type = type("Proficiency");
  proficiency.label = data.name;
  proficiency.ofType = data.type;
  proficiency.classes = data.classes.map((classData) =>
    createLdoDataset()
      .usingType(ClassShapeType)
      .fromSubject(dataUrl("classes", classData.index)),
  );
  proficiency.races = data.races.map((race) =>
    createLdoDataset()
      .usingType(RaceShapeType)
      .fromSubject(dataUrl("races", race.index)),
  );
  // references
  if (
    (data.type === "Armor" &&
      !data.reference.url.match(/equipment-categories/)) ||
    data.type === "Artisan's Tools" ||
    data.type === "Gaming Sets" ||
    data.type === "Musical Instruments" ||
    data.type === "Other" ||
    (data.type === "Weapons" &&
      !data.reference.url.match(/equipment-categories/))
  ) {
    proficiency.equipment = ldoDataset
      .usingType(EquipmentShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.reference.url));
  }
  if (
    (data.type === "Armor" &&
      !!data.reference.url.match(/equipment-categories/)) ||
    (data.type === "Weapons" &&
      !!data.reference.url.match(/equipment-categories/)) ||
    data.type === "Saving Throws"
  ) {
    proficiency.equipmentCategory = ldoDataset
      .usingType(EquipmentCategoryShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.reference.url));
  }
  if (data.type === "Saving Throws") {
    proficiency.savingThrow = ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.reference.url));
  }
  if (data.type === "Skills") {
    proficiency.skill = ldoDataset
      .usingType(SkillShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.reference.url));
  }
  return proficiency;
}

export default async function writeProficiencies() {
  const turtle = (
    await Promise.all(
      proficiencies.map((proficiency) =>
        toTurtle(transformProficiency(proficiency)),
      ),
    )
  ).reduce((memo, alignment) => memo.concat(alignment));
  writeFileSync(dataPath("proficiencies"), turtle);
}
