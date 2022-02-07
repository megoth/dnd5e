import { v4 as uuidv4 } from "uuid";
import migrateProficiencyData from "./index";
import { getDnd5eUrl, getSafeType } from "../../manage-data";
import { ProficiencyData } from "../../download/api.types";

const skillRelativeUrl = "/api/skills/investigation";
const skillUrl = getDnd5eUrl("/api/skills/investigation");
const skillId = uuidv4();
const equipmentRelativeUrl = "/api/equipment/shield";
const equipmenturl = getDnd5eUrl(equipmentRelativeUrl);
const equipmentId = uuidv4();
const preparedMap = {
  [skillUrl]: { _id: skillId },
  [equipmenturl]: { _id: equipmentId },
};

const skillProficiencyUrl =
  "https://www.dnd5eapi.co/api/proficiencies/skill-investigation";
const skillProficiency = {
  index: "skill-investigation",
  type: "Skills",
  name: "Skill: Investigation",
  classes: [],
  races: [],
  url: "/api/proficiencies/skill-investigation",
  reference: {
    index: "investigation",
    name: "Investigation",
    url: skillRelativeUrl,
  },
};
const equipmentProficiencyUrl =
  "https://www.dnd5eapi.co/api/proficiencies/shields";
const equipmentProficiency = {
  index: "shields",
  type: "Artisan's Tools",
  name: "Shields",
  classes: [
    {
      index: "barbarian",
      name: "Barbarian",
      url: "/api/classes/barbarian",
    },
    {
      index: "cleric",
      name: "Cleric",
      url: "/api/classes/cleric",
    },
    {
      index: "druid",
      name: "Druid",
      url: "/api/classes/druid",
    },
    {
      index: "fighter",
      name: "Fighter",
      url: "/api/classes/fighter",
    },
    {
      index: "paladin",
      name: "Paladin",
      url: "/api/classes/paladin",
    },
    {
      index: "ranger",
      name: "Ranger",
      url: "/api/classes/ranger",
    },
  ],
  races: [],
  url: "/api/proficiencies/shields",
  reference: {
    index: "shield",
    name: "Shield",
    url: "/api/equipment/shield",
  },
};

describe("migrateProficiencyData", () => {
  it("migrates skill proficiencies from D&D5e API to Sanity CMS", () => {
    expect(
      migrateProficiencyData(preparedMap)({
        [skillProficiencyUrl]: skillProficiency as ProficiencyData,
      })
    ).toEqual([
      {
        _type: "proficiency",
        name_en_US: skillProficiency.name,
        type: getSafeType(skillProficiency.type),
        skillReference: {
          _type: "reference",
          _ref: skillId,
        },
      },
    ]);
  });

  it("migrates equipment proficiencies from D&D5e API to Sanity CMS", () => {
    expect(
      migrateProficiencyData(preparedMap)({
        [equipmentProficiencyUrl]: equipmentProficiency as ProficiencyData,
      })
    ).toEqual([
      {
        _type: "proficiency",
        name_en_US: equipmentProficiency.name,
        type: getSafeType(equipmentProficiency.type),
        equipmentReference: {
          _type: "reference",
          _ref: equipmentId,
        },
      },
    ]);
  });
});
