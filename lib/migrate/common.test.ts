import { prepareData } from "./common";

const existingData = {
  "https://www.dnd5eapi.co/api/ability-scores/con": {
    _id: "49b77ad9-2053-4f2b-818f-0b5682a8ed45",
    slug: { _type: "slug", current: "con" },
    url: "https://www.dnd5eapi.co/api/ability-scores/con",
    _type: "abilityScore",
    name: "CON",
    fullName_en_US: "Constitution",
    description_en_US:
      "Constitution measures health, stamina, and vital force.\n\nConstitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster.",
  },
};
const importedData = {
  "https://www.dnd5eapi.co/api/ability-scores/con": {
    index: "con",
    name: "CON",
    full_name: "Constitution",
    desc: [
      "Constitution measures health, stamina, and vital force.",
      "Constitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster.",
    ],
    skills: [],
    url: "/api/ability-scores/con",
  },
  "https://www.dnd5eapi.co/api/ability-scores/wis": {
    index: "wis",
    name: "WIS",
    full_name: "Wisdom",
    desc: [
      "Wisdom reflects how attuned you are to the world around you and represents perceptiveness and intuition.",
      "A Wisdom check might reflect an effort to read body language, understand someone's feelings, notice things about the environment, or care for an injured person. The Animal Handling, Insight, Medicine, Perception, and Survival skills reflect aptitude in certain kinds of Wisdom checks.",
    ],
    skills: [],
    url: "/api/ability-scores/wis",
  },
};

describe("prepareData", () => {
  it("prepares SanityDocument", () => {
    expect(prepareData(existingData, importedData)).toEqual({
      "https://www.dnd5eapi.co/api/ability-scores/con": {
        _id: "49b77ad9-2053-4f2b-818f-0b5682a8ed45",
        slug: { _type: "slug", current: "con" },
        url: "https://www.dnd5eapi.co/api/ability-scores/con",
        _type: "abilityScore",
        name: "CON",
        fullName_en_US: "Constitution",
        description_en_US:
          "Constitution measures health, stamina, and vital force.\n\nConstitution checks are uncommon, and no skills apply to Constitution checks, because the endurance this ability represents is largely passive rather than involving a specific effort on the part of a character or monster.",
      },
      "https://www.dnd5eapi.co/api/ability-scores/wis": {
        _id: expect.any(String),
        slug: { _type: "slug", current: "wis" },
        url: "https://www.dnd5eapi.co/api/ability-scores/wis",
      },
    });
  });
});
