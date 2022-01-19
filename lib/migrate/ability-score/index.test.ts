import { v4 as uuidv4 } from "uuid";
import migrateAbilityScoreData from "./index";

const abilityUrl = "https://www.dnd5eapi.co/api/ability-scores/con";
const ability = {
  index: "con",
  name: "CON",
  full_name: "Constitution",
  desc: [
    "Constitution measures health, stamina, and vital force.",
    "Constitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster.",
  ],
  skills: [],
  url: "/api/ability-scores/con",
};
const abilityId = uuidv4();
const abilityMap = {
  [abilityUrl]: ability,
};

describe("migrateAbilityScoreData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateAbilityScoreData({})(abilityMap)).toEqual([
      {
        _type: "abilityScore",
        name: ability.name,
        fullName_en_US: ability.full_name,
        description_en_US: ability.desc.join("\n\n"),
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateAbilityScoreData({
        [abilityUrl]: {
          _id: abilityId,
          name: "TEST",
        },
      })(abilityMap)
    ).toEqual([
      {
        _id: abilityId,
        _type: "abilityScore",
        name: ability.name,
        fullName_en_US: ability.full_name,
        description_en_US: ability.desc.join("\n\n"),
      },
    ]);
  });
});
