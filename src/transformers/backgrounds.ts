import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  BackgroundFeatureShapeType,
  BackgroundShapeType,
  ProficiencyShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Background } from "../ldo/dnd5e.typings";
import { addendumPath, dataPath, dataUrl, description } from "../utils/dnd5e";
import { transformStartingEquipment } from "./startingEquipment";
import { transformChoice } from "./choice";
import backgrounds from "../dnd5eapi-data/5e-SRD-Backgrounds.json";
import { readFileSync } from "fs";

function transformBackground(
  data: components["schemas"]["Background"],
  ldoDataset = createLdoDataset(),
): Background {
  const background = ldoDataset
    .usingType(BackgroundShapeType)
    .fromSubject(`#${data.index}`);
  background.type = { "@id": "Background" };
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
  background.languageOptions =
    data.language_options && transformChoice(data.language_options, ldoDataset);
  background.backgroundFeature =
    data.feature &&
    ldoDataset.usingType(BackgroundFeatureShapeType).fromJson({
      label: data.feature.name,
      description: description(data.feature.desc),
    });
  background.personalityTraits =
    data.personality_traits &&
    transformChoice(data.personality_traits, ldoDataset);
  background.ideals = data.ideals && transformChoice(data.ideals, ldoDataset);
  background.bonds = data.bonds && transformChoice(data.bonds, ldoDataset);
  background.flaws = data.flaws && transformChoice(data.flaws, ldoDataset);
  return background;
}

export default async function writeBackgrounds() {
  const turtle = (
    await Promise.all(
      backgrounds.map((abilityScore) =>
        toTurtle(transformBackground(abilityScore)),
      ),
    )
  ).reduce((memo, background) => memo.concat(background));
  const addendum = readFileSync(addendumPath("backgrounds"), "utf-8");
  writeFileSync(dataPath("backgrounds"), turtle + addendum);
}
