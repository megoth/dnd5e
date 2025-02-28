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
import { Race } from "../ldo/dnd5e.typings";
import races from "../dnd5eapi-data/5e-SRD-Races.json";
import { writeFileSync } from "node:fs";
import { addendumPath, apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { transformChoice } from "./choice";
import { readFileSync } from "fs";

export function transformRace(
  data: components["schemas"]["Race"],
  ldoDataset = createLdoDataset(),
): Race {
  const race = ldoDataset
    .usingType(RaceShapeType)
    .fromSubject(`#${data.index}`);
  race.type = { "@id": "Race" };
  race.label = data.name;
  race.speed = data.speed;
  race.abilityBonuses = data.ability_bonuses.map((bonus) =>
    ldoDataset.usingType(AbilityBonusShapeType).fromJson({
      bonus: bonus.bonus,
      abilityScore: ldoDataset
        .usingType(AbilityScoreShapeType)
        .fromSubject(apiUrlToSubjectUrl(bonus.ability_score.url)),
    }),
  );
  race.alignmentDescription = data.alignment;
  race.age = data.age;
  race.size = data.size.toString();
  race.sizeDescription = data.size_description;
  race.startingProficiencies = data.starting_proficiencies.map((proficiency) =>
    ldoDataset
      .usingType(ProficiencyShapeType)
      .fromSubject(apiUrlToSubjectUrl(proficiency.url)),
  );
  race.startingProficiencyChoice =
    data.starting_proficiency_options &&
    transformChoice(data.starting_proficiency_options, ldoDataset);
  race.languages = data.languages.map((language) =>
    ldoDataset
      .usingType(LanguageShapeType)
      .fromSubject(apiUrlToSubjectUrl(language.url)),
  );
  race.languageDescription = data.language_desc;
  race.traits = data.traits.map((trait) =>
    ldoDataset
      .usingType(TraitShapeType)
      .fromSubject(apiUrlToSubjectUrl(trait.url)),
  );
  race.subraces = data.subraces.map((subrace) =>
    ldoDataset
      .usingType(SubraceShapeType)
      .fromSubject(apiUrlToSubjectUrl(subrace.url)),
  );
  return race;
}

export default async function writeRaces() {
  const turtle = (
    await Promise.all(
      races.map((race) =>
        toTurtle(transformRace(race as components["schemas"]["Race"])),
      ),
    )
  ).reduce((memo, races) => memo.concat(races));
  const addendum = readFileSync(addendumPath("races"), "utf-8");
  writeFileSync(dataPath("races"), turtle + addendum);
}
