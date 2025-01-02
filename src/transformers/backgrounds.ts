import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  BackgroundShapeType,
  ProficiencyShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Background } from "../ldo/dnd5e.typings";
import { dataPath, dataUrl } from "../utils/dnd5e";
import { transformStartingEquipment } from "./startingEquipment";
import { type } from "../../public/data/type";
import { transformChoice } from "./choice";

function transformBackground(
  data: components["schemas"]["Background"],
  ldoDataset = createLdoDataset(),
): Background {
  const background = ldoDataset
    .usingType(BackgroundShapeType)
    .fromSubject(`#${data.index}`);
  background.type = type("Background");
  background.label = data.name;
  if (data.starting_proficiencies) {
    background.startingProficiencies = data.starting_proficiencies.map(
      (proficiency) =>
        ldoDataset
          .usingType(ProficiencyShapeType)
          .fromSubject(dataUrl("proficiencies", proficiency.index)),
    );
  }
  if (data.starting_equipment) {
    background.startingEquipment = data.starting_equipment.map((starting) =>
      transformStartingEquipment(starting, ldoDataset),
    );
  }
  if (data.starting_equipment_options) {
    background.startingEquipmentOptions = data.starting_equipment_options.map(
      (choice) => transformChoice(choice, ldoDataset),
    );
  }
  return background;
}

export default async function writeBackgrounds(
  data: Array<components["schemas"]["Background"]>,
): Promise<void> {
  const turtle = (
    await Promise.all(
      data.map((abilityScore) => toTurtle(transformBackground(abilityScore))),
    )
  ).reduce((memo, background) => memo.concat(background));
  writeFileSync(dataPath("backgrounds"), turtle);
}
