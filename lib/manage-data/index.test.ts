import {
  getDnd5eDataPath,
  getSanityFilePath,
  migrateToMarkdown,
} from "./index";

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

describe("migrateToMarkdown", () => {
  it("migrates to markdown", () => {
    expect(migrateToMarkdown(["foo", "bar"])).toEqual("foo\n\nbar");
  });

  it("handles tables", () => {
    expect(
      migrateToMarkdown([
        "Wondrous item, very rare",
        "You can speak the carpet's command word as an  action to make the carpet hover and fly. It moves  according to your spoken directions, provided that you are within 30 feet of it.",
        "Four sizes of carpet of flying exist. The GM chooses the size of a given carpet or determines it randomly.",
        "| d100 | Size | Capacity | Flying Speed |",
        "|---|---|---|---|",
        "| 01-20 | 3 ft. × 5 ft. | 200 lb. | 80 feet |",
        "| 21-55 | 4 ft. × 6 ft. | 400 lb. | 60 feet |",
        "| 56-80 | 5 ft. × 7 ft. | 600 lb. | 40 feet |",
        "| 81-100 | 6 ft. × 9 ft. | 800 lb. | 30 feet |",
        "A carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity.",
      ])
    ).toEqual(`Wondrous item, very rare

You can speak the carpet's command word as an  action to make the carpet hover and fly. It moves  according to your spoken directions, provided that you are within 30 feet of it.

Four sizes of carpet of flying exist. The GM chooses the size of a given carpet or determines it randomly.

| d100 | Size | Capacity | Flying Speed |
|---|---|---|---|
| 01-20 | 3 ft. × 5 ft. | 200 lb. | 80 feet |
| 21-55 | 4 ft. × 6 ft. | 400 lb. | 60 feet |
| 56-80 | 5 ft. × 7 ft. | 600 lb. | 40 feet |
| 81-100 | 6 ft. × 9 ft. | 800 lb. | 30 feet |

A carpet can carry up to twice the weight shown on the table, but it flies at half speed if it carries more than its normal capacity.`);
  });
});
