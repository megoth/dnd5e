// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";
import abilityScore from "./abilityScore";
import alignment from "./alignment";
import condition from "./condition";
import damageType from "./damageType";
import skill from "./skill";
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
    condition,
    damageType,
    skill,
    weaponProperty,
  ]),
});
