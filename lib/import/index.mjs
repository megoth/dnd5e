import fetch from "node-fetch";
// import importAbilityScore from "./ability-scores.mjs";
// import importAlignment from "./alignments.mjs";
// import importBackground from "./backgrounds.mjs";
// import importClass from "./classes.mjs";
// import importCondition from "./conditions.mjs";
// import importDamageType from "./damage-types.mjs";
// import importEquipmentCategory from "./equipment-categories.mjs";
// import importEquipment from "./equipment.mjs";
// import importFeat from "./feats.mjs";
// import importFeature from "./feature.mjs";
// import importLanguage from "./language.mjs";
// import importMagicItem from "./magic-items.mjs";
// import importMagicSchool from "./magic-schools.mjs";
// import importMonster from "./monsters.mjs";
// import importProficiency from "./proficiencies.mjs";
// import importRace from "./races.mjs";
// import importRule from "./rules.mjs";
// import importRuleSection from "./rule-sections.mjs";
// import importSkill from "./skills.mjs";
// import importSpells from "./spells.mjs";
// import importSubclass from "./subclasses.mjs";
// import importTrait from "./traits.mjs";
// import importWeaponProperty from "./weapon-properties.mjs";

// const apiEndpointsMap = {
//   "ability-scores": importAbilityScore,
//   alignments: importAlignment,
//   backgrounds: importBackground,
//   classes: importClass,
//   conditions: importCondition,
//   "damage-types": importDamageType,
//   "equipment-categories": importEquipmentCategory,
//   equipment: importEquipment,
//   feats: importFeat,
//   features: importFeature,
//   languages: importLanguage,
//   "magic-items": importMagicItem,
//   "magic-schools": importMagicSchool,
//   monsters: importMonster,
//   proficiencies: importProficiency,
//   races: importRace,
//   rules: importRule,
//   "rule-sections": importRuleSection,
//   skills: importSkill,
//   spells: importSpells,
//   subraces: importSubclass,
//   traits: importTrait,
//   "weapon-properties": importWeaponProperty,
// };

function getApiUrl(endpointUrl) {
  return `https://www.dnd5eapi.co${endpointUrl}`;
}

export default async function importData() {
  const apiResponse = await fetch(getApiUrl("/api/"));
  const apiEndpointMap = await apiResponse.json();
  await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(apiEndpointMap).map(async ([endpoint, endpointUrl]) => {
      const endpointResponse = await fetch(getApiUrl(endpointUrl));
      const endpointData = await endpointResponse.json();
      console.log(endpointData.results[0]);
    })
  );
}
