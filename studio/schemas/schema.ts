import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import abilityPrerequisite from "./abilityPrerequisite";
import abilityScore from "./abilityScore";
import alignment from "./alignment";
import armorClass from "./armorClass";
import condition from "./condition";
import cost from "./cost";
import damage from "./damage";
import damageAtCharacterLevel from "./damageAtCharacterLevel";
import damageAtSlotLevel from "./damageAtSlotLevel";
import damageType from "./damageType";
import difficultyClass from "./difficultyClass";
import equipment from "./equipment";
import equipmentCategory from "./equipmentCategory";
import feat from "./feat";
import item from "./item";
import range from "./range";
import skill from "./skill";
import vehicleSpeed from "./vehicleSpeed";
import weaponProperty from "./weaponProperty";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    abilityPrerequisite,
    abilityScore,
    alignment,
    armorClass,
    condition,
    cost,
    damage,
    damageAtCharacterLevel,
    damageAtSlotLevel,
    damageType,
    difficultyClass,
    equipment,
    equipmentCategory,
    feat,
    item,
    range,
    skill,
    vehicleSpeed,
    weaponProperty,
  ]),
});
