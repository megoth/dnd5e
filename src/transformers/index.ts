import { components } from "../typings/dnd5eapi";

import abilityScores from "../dnd5eapi-data/5e-SRD-Ability-Scores.json";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import backgrounds from "../dnd5eapi-data/5e-SRD-Backgrounds.json";
import conditions from "../dnd5eapi-data/5e-SRD-Conditions.json";
import damageTypes from "../dnd5eapi-data/5e-SRD-Damage-Types.json";
import languages from "../dnd5eapi-data/5e-SRD-Languages.json";
import proficiencies from "../dnd5eapi-data/5e-SRD-Proficiencies.json";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";

import transformAlignments from "./alignments";
import transformAbilityScores from "./abilityScores";
import transformSkills from "./skills";
import transformProficiencies from "./proficiencies";
import transformLanguages from "./languages";
import transformDamageTypes from "./damageTypes";
import transformConditions from "./conditions";
import transformBackgrounds from "./backgrounds";

export default async function transformData() {
  return Promise.all([
    transformAbilityScores(abilityScores),
    transformAlignments(alignments),
    transformBackgrounds(backgrounds),
    transformConditions(conditions),
    transformDamageTypes(damageTypes),
    transformLanguages(languages as Array<components["schemas"]["Language"]>),
    transformSkills(skills),
    transformProficiencies(proficiencies),
  ]);
}
