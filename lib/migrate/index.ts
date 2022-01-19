import { readFile, writeFile } from "fs";
import { getSanityFilePath } from "../manage-data";
import {
  AbilityScoreData,
  AlignmentData,
  BaseData,
  ConditionData,
  DamageTypeData,
  EquipmentCategoryData,
  EquipmentData,
  SkillData,
  WeaponPropertyData,
} from "../download/api.types";
import migrateAbilityScoreData from "./ability-score";
import migrateAlignmentData from "./alignment";
import migrateDamageTypeData from "./damage-type";
import migrateSkillData from "./skill";
import migrateWeaponPropertyData from "./weapon-property";
import migrateConditionData from "./condition";
import migrateEquipmentCategoryData from "./equipment-category";
import migrateEquipmentData from "./equipment";
import { prepareData, PreparedDocument } from "./common";
import { openFile } from "../manage-data/node-common";

async function loadExistingData(): Promise<Record<string, PreparedDocument>> {
  try {
    return new Promise((resolve, reject) => {
      readFile(getSanityFilePath(), "utf-8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const dataMap = data
          .split("\n")
          .reduce<Record<string, any>>((memo, line) => {
            try {
              const json = JSON.parse(line);
              // eslint-disable-next-line no-param-reassign
              memo[json.url] = json;
              return memo;
            } catch (e) {
              return memo;
            }
          }, {});
        resolve(dataMap);
      });
    });
  } catch (e) {
    // TODO: handle errors better
    return {};
  }
}

export default async function migrateData() {
  const existingDataMap = await loadExistingData();
  const importedData = (await Promise.all([
    openFile("ability-scores"),
    openFile("alignments"),
    openFile("conditions"),
    openFile("damage-types"),
    openFile("equipment"),
    openFile("equipment-categories"),
    openFile("skills"),
    openFile("weapon-properties"),
  ])) as Array<Record<string, BaseData>>;
  const preparedDataMap = importedData
    .map((data) => prepareData(existingDataMap, data))
    .reduce<Record<string, any>>((memo, map) => ({ ...memo, ...map }), {});
  const [
    abilityScores,
    alignments,
    conditions,
    damageTypes,
    equipment,
    equipmentCategories,
    skills,
    weaponProperties,
  ] = importedData as [
    Record<string, AbilityScoreData>,
    Record<string, AlignmentData>,
    Record<string, ConditionData>,
    Record<string, DamageTypeData>,
    Record<string, EquipmentData>,
    Record<string, EquipmentCategoryData>,
    Record<string, SkillData>,
    Record<string, WeaponPropertyData>
  ];
  const migratedDataMap = [
    migrateAbilityScoreData(preparedDataMap)(abilityScores),
    migrateAlignmentData(preparedDataMap)(alignments),
    migrateConditionData(preparedDataMap)(conditions),
    migrateDamageTypeData(preparedDataMap)(damageTypes),
    migrateEquipmentData(preparedDataMap)(equipment),
    migrateEquipmentCategoryData(preparedDataMap)(equipmentCategories),
    migrateSkillData(preparedDataMap)(skills),
    migrateWeaponPropertyData(preparedDataMap)(weaponProperties),
  ];
  const data = Object.values(migratedDataMap)
    .flat()
    .map((item) => JSON.stringify(item))
    .join("\n");
  const sanityFilePath = getSanityFilePath();
  await writeFile(sanityFilePath, data, { flag: "w+" }, (error) => {
    if (error) {
      console.error(
        `Something went wrong when packaging: ${sanityFilePath}`,
        error
      );
      return;
    }
    console.log(`Written data to ${sanityFilePath}`);
  });
}
