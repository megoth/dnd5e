import abilityScores from "../dnd5eapi-data/5e-SRD-Ability-Scores.json";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";

import transformAlignments from "./alignments";
import transformAbilityScores from "./abilityScores";
import transformSkills from "./skills";

const ALIGNMENTS_PATH = "/public/data/alignments.ttl";
const ABILITY_SCORES_PATH = "/public/data/abilityScores.ttl";
const SKILLS_PATH = "/public/data/skills.ttl";

const ABILITY_SCORE_URL = "https://dnd5e.app/data/abilityScores.ttl#";
const ALIGNMENT_URL = "https://dnd5e.app/data/alignments.ttl#";
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
  ]);
}
