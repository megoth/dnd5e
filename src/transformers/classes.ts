import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  ClassLevelShapeType,
  ClassShapeType,
  ProficiencyShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Class } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { type } from "../../public/data/type";
import transformMulticlassing from "./multiclassings";
import { transformChoice } from "./choice";
import { transformStartingEquipment } from "./startingEquipment";

function transformClass(
  data: components["schemas"]["Class"],
  ldoDataset = createLdoDataset(),
): Class {
  const adventureClass = ldoDataset
    .usingType(ClassShapeType)
    .fromSubject(`#${data.index}`);
  adventureClass.type = type("Class");
  adventureClass.label = data.name;
  adventureClass.hitDie = data.hit_die;
  adventureClass.multiclassing =
    data.multi_classing &&
    transformMulticlassing(data.multi_classing, ldoDataset);
  adventureClass.proficiencies = data.proficiencies.map((proficiency) =>
    ldoDataset
      .usingType(ProficiencyShapeType)
      .fromSubject(dataUrl("proficiencies", proficiency.index)),
  );
  adventureClass.proficiencyChoices = data.proficiency_choices.map((choice) =>
    transformChoice(choice, ldoDataset),
  );
  adventureClass.savingThrows = data.saving_throws.map((savingThrow) =>
    ldoDataset
      .usingType(AbilityScoreShapeType)
      .fromSubject(dataUrl("abilityScores", savingThrow.index)),
  );
  adventureClass.startingEquipment = data.starting_equipment.map(
    (startingEquipment) =>
      transformStartingEquipment(startingEquipment, ldoDataset),
  );
  adventureClass.startingEquipmentOptions = data.starting_equipment_options.map(
    (option) => transformChoice(option, ldoDataset),
  );
  adventureClass.levels = Array.from({ length: 20 }).map((_, index) =>
    ldoDataset
      .usingType(ClassLevelShapeType)
      .fromSubject(dataUrl("class-levels", `${data.index}-${index + 1}`)),
  );
  return adventureClass;
}

export default async function writeClasses(
  data: Array<components["schemas"]["Class"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((adventureClass) => toTurtle(transformClass(adventureClass))),
    )
  ).reduce((memo, condition) => memo.concat(condition));
  writeFileSync(dataPath("classes"), turtle);
}
