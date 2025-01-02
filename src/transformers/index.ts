import { components } from "../typings/dnd5eapi";

import abilityScores from "../dnd5eapi-data/5e-SRD-Ability-Scores.json";
import alignments from "../dnd5eapi-data/5e-SRD-Alignments.json";
import backgrounds from "../dnd5eapi-data/5e-SRD-Backgrounds.json";
import classes from "../dnd5eapi-data/5e-SRD-Classes.json";
import conditions from "../dnd5eapi-data/5e-SRD-Conditions.json";
import damageTypes from "../dnd5eapi-data/5e-SRD-Damage-Types.json";
import languages from "../dnd5eapi-data/5e-SRD-Languages.json";
import proficiencies from "../dnd5eapi-data/5e-SRD-Proficiencies.json";
import skills from "../dnd5eapi-data/5e-SRD-Skills.json";
import equipment from "../dnd5eapi-data/5e-SRD-Equipment.json";
import equipmentCategories from "../dnd5eapi-data/5e-SRD-Equipment-Categories.json";

import writeAlignments from "./alignments";
import writeAbilityScores from "./abilityScores";
import writeSkills from "./skills";
import writeProficiencies from "./proficiencies";
import writeLanguages from "./languages";
import writeDamageTypes from "./damageTypes";
import writeConditions from "./conditions";
import writeBackgrounds from "./backgrounds";
import writeClasses from "./classes";
import writeEquipment from "./equipment";
import writeEquipmentCategory from "./equipmentCategory";

export default async function transformData() {
  return Promise.all([
    writeAbilityScores(abilityScores),
    writeAlignments(alignments),
    writeBackgrounds(backgrounds),
    writeClasses(classes as Array<components["schemas"]["Class"]>),
    writeConditions(conditions),
    writeDamageTypes(damageTypes),
    writeEquipment(equipment),
    writeEquipmentCategory(equipmentCategories),
    writeLanguages(languages as Array<components["schemas"]["Language"]>),
    writeProficiencies(proficiencies),
    writeSkills(skills),
  ]);
}
