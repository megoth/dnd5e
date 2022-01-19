import { v4 as uuidv4 } from "uuid";
import migrateSkillData from "./index";
import { getDnd5eUrl } from "../../manage-data";

const skillUrl = "https://www.dnd5eapi.co/api/skills/arcana";
const abilityScoreRelativeUrl = "/api/ability-scores/int";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const skill = {
  index: "arcana",
  name: "Arcana",
  desc: [
    "Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.",
  ],
  ability_score: {
    index: "int",
    name: "INT",
    url: abilityScoreRelativeUrl,
  },
  url: "/api/skills/arcana",
};
const skillId = uuidv4();
const abilityScoreId = uuidv4();
const skillMap = {
  [skillUrl]: skill,
};
const preparedMap = {
  [abilityScoreUrl]: { _id: abilityScoreId },
};

describe("migrateSkillData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateSkillData(preparedMap)(skillMap)).toEqual([
      {
        _type: "skill",
        name_en_US: skill.name,
        description_en_US: skill.desc.join("\n\n"),
        abilityScore: {
          _type: "reference",
          _ref: abilityScoreId,
        },
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateSkillData({
        ...preparedMap,
        [skillUrl]: {
          _id: skillId,
          name_en_US: "TEST",
        },
      })(skillMap)
    ).toEqual([
      {
        _id: skillId,
        _type: "skill",
        name_en_US: skill.name,
        description_en_US: skill.desc.join("\n\n"),
        abilityScore: {
          _type: "reference",
          _ref: abilityScoreId,
        },
      },
    ]);
  });
});
