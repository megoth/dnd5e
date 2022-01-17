import { readFile, writeFile } from "fs";
import { getDnd5eDataPath, getSanityFilePath } from "../manage-data";
import migrateAbilityScoreData from "./ability-score";
import migrateAlignmentData from "./alignment";
import migrateSkillData, { addSkillReferences } from "./skill";
import {
  AbilityScoreData,
  AlignmentData,
  DamageTypeData,
  SkillData,
} from "../download/api.types";
import migrateDamageTypeData from "./damage-type";

async function loadExistingData() {
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

async function openFile(type) {
  try {
    return new Promise((resolve, reject) => {
      readFile(getDnd5eDataPath(type), "utf-8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(JSON.parse(data));
      });
    });
  } catch (e) {
    // TODO: handle errors better
    return {};
  }
}

export default async function migrateData() {
  const existingDataMap = await loadExistingData();
  const [abilityScores, alignments, damageTypes, skills] = (await Promise.all([
    openFile("ability-scores"),
    openFile("alignments"),
    openFile("damage-types"),
    openFile("skills"),
  ])) as [
    Record<string, AbilityScoreData>,
    Record<string, AlignmentData>,
    Record<string, DamageTypeData>,
    Record<string, SkillData>
  ];
  const migratedDataMap = [
    migrateAbilityScoreData(existingDataMap)(abilityScores),
    migrateAlignmentData(existingDataMap)(alignments),
    migrateDamageTypeData(existingDataMap)(damageTypes),
    migrateSkillData(existingDataMap)(skills),
  ].reduce<Record<string, any>>((memo, map) => ({ ...memo, ...map }), {});
  const linkedData = {
    ...migratedDataMap,
    ...addSkillReferences(migratedDataMap, skills),
  };
  const data = Object.values(linkedData)
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
