import { readFile } from "fs";
import { getDnd5eDataPath } from "./index";

// eslint-disable-next-line import/prefer-default-export
export async function openFile(type) {
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
