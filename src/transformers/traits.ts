import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  RaceShapeType,
  SubraceShapeType,
  TraitShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { type } from "../../public/data/type";
import traits from "../dnd5eapi-data/5e-SRD-Traits.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { Trait } from "../ldo/dnd5e.typings";

export function transformTrait(
  data: components["schemas"]["Trait"],
  ldoDataset = createLdoDataset(),
): Trait {
  const trait = ldoDataset
    .usingType(TraitShapeType)
    .fromSubject(`#${data.index}`);
  trait.type = type("Trait");
  trait.label = data.name;
  trait.description = data.desc;
  trait.races = data.races?.map((race) =>
    ldoDataset
      .usingType(RaceShapeType)
      .fromSubject(apiUrlToSubjectUrl(race.url)),
  );
  trait.subraces = data.subraces?.map((subrace) =>
    ldoDataset
      .usingType(SubraceShapeType)
      .fromSubject(apiUrlToSubjectUrl(subrace.url)),
  );
  // proficiencies
  // proficiencyChoices
  // languageOptions
  // traitSpecific
  return trait;
}

export default async function writeTraits() {
  const turtle = (
    await Promise.all(
      traits.map((trait) =>
        toTurtle(transformTrait(trait as components["schemas"]["Trait"])),
      ),
    )
  ).reduce((memo, traits) => memo.concat(traits));
  writeFileSync(dataPath("traits"), turtle);
}
