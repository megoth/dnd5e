import { writeFile } from "fs";
import prettier from "prettier";
import { exec } from "child_process";
import { openFile } from "../manage-data/node-common";

async function packageData(module, importType, type) {
  const data = Object.values(await openFile(module));
  const code = prettier.format(
    `import { ${importType} } from "../../lib/download/api.types";

const test: Array<${type}> = ${JSON.stringify(data, null, 2)};

export default test;
`,
    { parser: "babel" }
  );
  const testFile = `data/dnd5eapi-test/${module}.ts`;
  await writeFile(testFile, code, { flag: "w+" }, (error) => {
    if (error) {
      console.error(
        `Something went wrong when writing to ${module} test file`,
        error
      );
    }
  });
  exec(
    `npx ts-node --project tsconfig-tsnode.json ${testFile}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`Successfully tested types for ${module} test file`);
    }
  );
}

export default async function testTypes() {
  await Promise.all(
    [
      ["ability-scores", "AbilityScoreData"],
      ["alignments", "AlignmentData"],
      ["backgrounds", "BackgroundData"],
      ["class-levels", "LevelData", "Array<LevelData>"],
      ["classes", "ClassData"],
      ["conditions", "ConditionData"],
      ["damage-types", "DamageTypeData"],
      ["equipment", "EquipmentData"],
      ["equipment-categories", "EquipmentCategoryData"],
      ["feats", "FeatData"],
      ["features", "FeatureData"],
      ["languages", "LanguageData"],
      ["magic-items", "MagicItemData"],
      ["magic-schools", "MagicSchoolData"],
      ["monsters", "MonsterData"],
      ["proficiencies", "ProficiencyData"],
      ["races", "RaceData"],
      ["rule-sections", "RuleSectionData"],
      ["rules", "RuleData"],
      ["skills", "SkillData"],
      ["spells", "SpellData"],
      ["subclass-levels", "LevelData", "Array<LevelData>"],
      ["subclasses", "SubclassData"],
      ["subraces", "SubraceData"],
      ["traits", "TraitData"],
      ["weapon-properties", "WeaponPropertyData"],
    ].map(([module, importType, type]) =>
      packageData(module, importType, type || importType)
    )
  );
}
