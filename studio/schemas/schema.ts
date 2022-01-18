// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import abilityScore from "./abilityScore";
import alignment from "./alignment";
import armorClass from "./armorClass";
import condition from "./condition";
import cost from "./cost";
import damage from "./damage";
import damageAtCharacterLevel from "./damageAtCharacterLevel";
import damageType from "./damageType";
import difficultyClass from "./difficultyClass";
import equipment from "./equipment";
import equipmentCategory from "./equipmentCategory";
import item from "./item";
import range from "./range";
import skill from "./skill";
import vehicleSpeed from "./vehicleSpeed";
import weaponProperty from "./weaponProperty";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    abilityScore,
    alignment,
    armorClass,
    condition,
    cost,
    damage,
    damageAtCharacterLevel,
    damageType,
    difficultyClass,
    equipment,
    equipmentCategory,
    item,
    range,
    skill,
    vehicleSpeed,
    weaponProperty,
  ]),
});
