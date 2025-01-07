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
import writeLevels from "./levels";
import writeFeatures from "./features";
import writeSpells from "./spells";
import writeMagicSchools from "./magicSchools";
import writeSubclasses from "./subclasses";

export default async function transformData() {
  return Promise.all([
    writeAbilityScores(),
    writeAlignments(),
    writeBackgrounds(),
    writeClasses(),
    writeConditions(),
    writeDamageTypes(),
    writeEquipment(),
    writeEquipmentCategory(),
    writeFeatures(),
    writeLanguages(),
    writeMagicSchools(),
    writeLevels(),
    writeProficiencies(),
    writeSkills(),
    writeSpells(),
    writeSubclasses(),
  ]);
}
