import { v4 as uuidv4 } from "uuid";
import migrateSkillData from "./index";
import { getDnd5eUrl, migrateToMarkdown } from "../../manage-data";
import { TraitData } from "../../download/api.types";
import {
  preparedDataMap as traitSpecificDataMap,
  traitSpecific,
} from "../trait-specific/index.test";

const skillRelativeUrl = "/api/proficiencies/skill-intimidation";
const skillUrl = getDnd5eUrl(skillRelativeUrl);
const skillId = uuidv4();
const parentTraitRelativeUrl = "/api/traits/draconic-ancestry";
const parentTraitUrl = getDnd5eUrl(parentTraitRelativeUrl);
const parentTraitId = uuidv4();
const preparedDataMap = {
  ...traitSpecificDataMap,
  [skillUrl]: { _id: skillId },
  [parentTraitUrl]: { _id: parentTraitId },
};

const traitUrl = "https://www.dnd5eapi.co/api/traits/draconic-ancestry-copper";
const simpleTrait: TraitData = {
  index: "draconic-ancestry-copper",
  races: [],
  subraces: [],
  name: "Draconic Ancestry (Copper)",
  desc: [
    "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
  ],
  proficiencies: [
    {
      index: "skill-intimidation",
      name: "Skill: Intimidation",
      url: skillRelativeUrl,
    },
  ],
  url: "/api/traits/draconic-ancestry-copper",
};
const complexTrait: TraitData = {
  index: "draconic-ancestry-copper",
  races: [],
  subraces: [],
  name: "Draconic Ancestry (Copper)",
  desc: [
    "You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.",
  ],
  parent: {
    index: "draconic-ancestry",
    name: "Draconic Ancestry",
    url: parentTraitRelativeUrl,
  },
  proficiencies: [
    {
      index: "skill-intimidation",
      name: "Skill: Intimidation",
      url: skillRelativeUrl,
    },
  ],
  proficiency_choices: {
    choose: 2,
    type: "proficiencies",
    from: [
      {
        index: "skill-acrobatics",
        name: "Skill: Acrobatics",
        url: skillRelativeUrl,
      },
    ],
  },
  trait_specific: traitSpecific,
  url: "/api/traits/draconic-ancestry-copper",
};

describe("migrateTraitData", () => {
  it("migrates simple data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateSkillData(preparedDataMap)({
        [traitUrl]: simpleTrait,
      })
    ).toEqual([
      {
        _type: "trait",
        name_en_US: simpleTrait.name,
        description_en_US: migrateToMarkdown(simpleTrait.desc),
        proficiencies: [
          { _key: expect.any(String), _type: "reference", _ref: skillId },
        ],
      },
    ]);
  });

  it("migrates complex data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateSkillData(preparedDataMap)({
        [traitUrl]: complexTrait,
      })
    ).toEqual([
      {
        _type: "trait",
        name_en_US: simpleTrait.name,
        description_en_US: migrateToMarkdown(simpleTrait.desc),
        parent: { _type: "reference", _ref: parentTraitId },
        proficiencies: [
          { _key: expect.any(String), _type: "reference", _ref: skillId },
        ],
        proficiencyChoices: {
          _type: "proficiencyChoice",
          choose: complexTrait.proficiency_choices.choose,
          from: [
            { _key: expect.any(String), _type: "reference", _ref: skillId },
          ],
        },
        traitSpecific: expect.any(Object), // See tests in trait-specific
      },
    ]);
  });
});
