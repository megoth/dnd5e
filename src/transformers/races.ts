import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityBonusShapeType,
  AbilityScoreShapeType,
  RaceShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Race } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import races from "../dnd5eapi-data/5e-SRD-Races.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";

export function transformRace(
  data: components["schemas"]["Race"],
  ldoDataset = createLdoDataset(),
): Race {
  const race = ldoDataset
    .usingType(RaceShapeType)
    .fromSubject(`#${data.index}`);
  race.type = type("Race");
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
  // startingProficiencies
  // startingProficiencyOptions
  // languages
  // languageDescription
  // traits
  // subraces
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
  writeFileSync(dataPath("races"), turtle);
}
