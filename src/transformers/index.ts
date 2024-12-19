import abilityScores from "../dnd5eapi-data/5e-SRD-Ability-Scores.json";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import proficiencies from "../dnd5eapi-data/5e-SRD-Proficiencies.json";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";

import transformAlignments from "./alignments";
import transformAbilityScores from "./abilityScores";
import transformSkills from "./skills";
import transformProficiencies from "./proficiencies";

const ALIGNMENTS_PATH = "/public/data/alignments.ttl";
const ABILITY_SCORES_PATH = "/public/data/abilityScores.ttl";
const PROFICIENCIES_PATH = "/public/data/proficiencies.ttl";
const SKILLS_PATH = "/public/data/skills.ttl";

const ABILITY_SCORE_URL = "https://dnd5e.app/data/abilityScores.ttl#";
const ALIGNMENT_URL = "https://dnd5e.app/data/alignments.ttl#";
const CLASS_URL = "https://dnd5e.app/data/classes.ttl#";
const PROFICIENCIES_URL = "https://dnd5e.app/data/proficiencies.ttl#";
const RACE_URL = "https://dnd5e.app/data/races.ttl#";
const SKILL_URL = "https://dnd5e.app/data/alignments.ttl#";

export default async function transformData() {
  return Promise.all([
    transformAbilityScores(
      abilityScores,
      ABILITY_SCORES_PATH,
      ABILITY_SCORE_URL,
      SKILL_URL,
    ),
    transformAlignments(alignments, ALIGNMENTS_PATH, ALIGNMENT_URL),
    transformSkills(skills, SKILLS_PATH, SKILL_URL, ABILITY_SCORE_URL),
    transformProficiencies(
      proficiencies,
      PROFICIENCIES_PATH,
      PROFICIENCIES_URL,
      CLASS_URL,
      RACE_URL,
    ),
  ]);
}
