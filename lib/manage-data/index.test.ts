import { getDnd5eDataPath, getSanityFilePath } from "./index";

describe("getDnd5eDataPath", () => {
  it("returns the path for local JSON-files downloaded from the D&D5e API", () => {
    expect(getDnd5eDataPath("skills")).toEqual("./data/dnd5eapi/skills.json");
  });
});

describe("getSanityFilePath", () => {
  it("returns the path for local NDJSON-files needed for Sanity CMS", () => {
    expect(getSanityFilePath()).toEqual("./data/sanity/data.ndjson");
  });
});
