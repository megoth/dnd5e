import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import abilityPrerequisite from "./abilityPrerequisite";
import abilityScore from "./abilityScore";
import action from "./action";
import actionChoice from "./actionChoice";
import actionOption from "./actionOption";
import actionOptions from "./actionOptions";
import actionReference from "./actionReference";
import actionUsage from "./actionUsage";
import alignment from "./alignment";
import areaOfEffect from "./areaOfEffect";
import armorClass from "./armorClass";
import condition from "./condition";
import cost from "./cost";
import damage from "./damage";
import damageAtCharacterLevel from "./damageAtCharacterLevel";
import damageAtSlotLevel from "./damageAtSlotLevel";
import damageChoice from "./damageChoice";
import damageType from "./damageType";
import difficultyClass from "./difficultyClass";
import equipment from "./equipment";
import equipmentCategory from "./equipmentCategory";
import feat from "./feat";
import healAtSlotLevel from "./healAtSlotLevel";
import item from "./item";
import language from "./language";
import magicItem from "./magicItem";
import magicSchool from "./magicSchool";
import proficiency from "./proficiency";
import proficiencyChoice from "./proficiencyChoice";
import range from "./range";
import rule from "./rule";
import ruleSection from "./ruleSection";
import skill from "./skill";
import spell from "./spell";
import spellChoice from "./spellChoice";
import trait from "./trait";
import traitChoice from "./traitChoice";
import traitSpecific from "./traitSpecific";
import vehicleSpeed from "./vehicleSpeed";
import weaponProperty from "./weaponProperty";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    abilityPrerequisite,
    abilityScore,
    action,
    actionChoice,
    actionOption,
    actionOptions,
    actionReference,
    actionUsage,
    alignment,
    areaOfEffect,
    armorClass,
    condition,
    cost,
    damage,
    damageAtCharacterLevel,
    damageAtSlotLevel,
    damageChoice,
    damageType,
    difficultyClass,
    equipment,
    equipmentCategory,
    feat,
    healAtSlotLevel,
    item,
    language,
    magicItem,
    magicSchool,
    proficiency,
    proficiencyChoice,
    range,
    rule,
    ruleSection,
    skill,
    spell,
    spellChoice,
    trait,
    traitChoice,
    traitSpecific,
    vehicleSpeed,
    weaponProperty,
  ]),
});
