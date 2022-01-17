import { readFile, writeFile } from "fs";
import migrateAlignmentData from "./alignment";
import { getDnd5eDataPath, getSanityFilePath } from "../manage-data";
import migrateAbilityScoreData from "./ability-score";

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
  const migratedDataMap = (
    await Promise.all([
      openFile("ability-scores").then(migrateAbilityScoreData(existingDataMap)),
      openFile("alignments").then(migrateAlignmentData(existingDataMap)),
    ])
  ).reduce<Record<string, any>>((memo, map) => ({ ...memo, ...map }), {});
  // // TODO: need to link up entities
  const data = Object.values(migratedDataMap)
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
