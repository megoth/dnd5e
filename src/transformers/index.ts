import abilityScores from "../dnd5eapi-data/5e-SRD-Ability-Scores.json";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import languages from "../dnd5eapi-data/5e-SRD-Languages.json";
import proficiencies from "../dnd5eapi-data/5e-SRD-Proficiencies.json";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";

import transformAlignments from "./alignments";
import transformAbilityScores from "./abilityScores";
import transformSkills from "./skills";
import transformProficiencies from "./proficiencies";
import transformLanguages from "./languages";

const ALIGNMENTS_PATH = "/public/data/alignments.ttl";
const ABILITY_SCORES_PATH = "/public/data/abilityScores.ttl";
const PROFICIENCIES_PATH = "/public/data/proficiencies.ttl";
const LANGUAGES_PATH = "/public/data/languages.ttl";
const SKILLS_PATH = "/public/data/skills.ttl";

const ABILITY_SCORES_URL = "https://dnd5e.app/data/abilityScores.ttl#";
const ALIGNMENTS_URL = "https://dnd5e.app/data/alignments.ttl#";
const CLASSES_URL = "https://dnd5e.app/data/classes.ttl#";
const LANGUAGES_URL = "https://dnd5e.app/data/languages.ttl#";
const PROFICIENCIES_URL = "https://dnd5e.app/data/proficiencies.ttl#";
const RACES_URL = "https://dnd5e.app/data/races.ttl#";
const SKILLS_URL = "https://dnd5e.app/data/alignments.ttl#";

export default async function transformData() {
  return Promise.all([
    transformAbilityScores(
      abilityScores,
      ABILITY_SCORES_PATH,
      ABILITY_SCORES_URL,
      SKILLS_URL,
    ),
    transformAlignments(alignments, ALIGNMENTS_PATH, ALIGNMENTS_URL),
    transformLanguages(languages, LANGUAGES_PATH, LANGUAGES_URL),
    transformSkills(skills, SKILLS_PATH, SKILLS_URL, ABILITY_SCORES_URL),
    transformProficiencies(
      proficiencies,
      PROFICIENCIES_PATH,
      PROFICIENCIES_URL,
      CLASSES_URL,
      RACES_URL,
    ),
  ]);
}
