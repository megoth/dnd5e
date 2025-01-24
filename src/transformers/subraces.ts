import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityBonusShapeType,
  AbilityScoreShapeType,
  LanguageShapeType,
  ProficiencyShapeType,
  RaceShapeType,
  SubraceShapeType,
  TraitShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { writeFileSync } from "node:fs";
import { Subrace } from "../ldo/dnd5e.typings";
import { addendumPath, apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import subraces from "../dnd5eapi-data/5e-SRD-Subraces.json";
import { readFileSync } from "fs";
import { transformChoice } from "./choice";

function transformSubrace(
  data: components["schemas"]["Subrace"],
  ldoDataset = createLdoDataset(),
): Subrace {
  const subrace = ldoDataset
    .usingType(SubraceShapeType)
    .fromSubject(`#${data.index}`);
  subrace.type = { "@id": "Subrace" };
  subrace.label = data.name;
  subrace.description = data.desc;
  subrace.race = ldoDataset
    .usingType(RaceShapeType)
    .fromSubject(apiUrlToSubjectUrl(data.race.url));
  subrace.abilityBonuses = data.ability_bonuses.map((bonus) =>
    ldoDataset.usingType(AbilityBonusShapeType).fromJson({
      bonus: bonus.bonus,
      abilityScore: ldoDataset
        .usingType(AbilityScoreShapeType)
        .fromSubject(apiUrlToSubjectUrl(bonus.ability_score.url)),
    }),
  );
  subrace.startingProficiencies = data.starting_proficiencies.map(
    (proficiency) =>
      ldoDataset
        .usingType(ProficiencyShapeType)
        .fromSubject(apiUrlToSubjectUrl(proficiency.url)),
  );
  subrace.languages = data.languages.map((language) =>
    ldoDataset
      .usingType(LanguageShapeType)
      .fromSubject(apiUrlToSubjectUrl(language.url)),
  );
  subrace.languageOptions =
    data.language_options && transformChoice(data.language_options, ldoDataset);
  subrace.traits = data.racial_traits.map((trait) =>
    ldoDataset
      .usingType(TraitShapeType)
      .fromSubject(apiUrlToSubjectUrl(trait.url)),
  );
  return subrace;
}

export default async function writeSubraces() {
  const turtle = (
    await Promise.all(
      subraces.map((subrace) => toTurtle(transformSubrace(subrace))),
    )
  ).reduce((memo, subraces) => memo.concat(subraces));
  const addendum = readFileSync(addendumPath("subraces"), "utf-8");
  writeFileSync(dataPath("subraces"), turtle + addendum);
}
