import migrateLanguageData from "./index";
import { LanguageData } from "../../download/api.types";

const completeLanguageUrl = "https://www.dnd5eapi.co/api/languages/dwarvish";
const completeLanguage: LanguageData = {
  index: "dwarvish",
  name: "Dwarvish",
  desc: "Dwarvish is full of hard consonants and guttural sounds.",
  type: "Standard",
  typical_speakers: ["Dwarves"],
  script: "Dwarvish",
  url: "/api/languages/dwarvish",
};
const partialLanguageUrl = "https://www.dnd5eapi.co/api/languages/deep-speech";
const partialLanguage: LanguageData = {
  index: "deep-speech",
  name: "Deep Speech",
  type: "Exotic",
  typical_speakers: ["Aboleths", "Cloakers"],
  script: null,
  url: "/api/languages/deep-speech",
};

describe("migrateFeatData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateLanguageData({})({
        [completeLanguageUrl]: completeLanguage,
      })
    ).toEqual([
      {
        _type: "language",
        name_en_US: "Dwarvish",
        description_en_US:
          "Dwarvish is full of hard consonants and guttural sounds.",
        script_en_US: "Dwarvish",
        type: "Standard",
        typicalSpeakers_en_US: ["Dwarves"],
      },
    ]);
  });

  it("handles optional fields", () => {
    expect(
      migrateLanguageData({})({
        [partialLanguageUrl]: partialLanguage,
      })
    ).toEqual([
      {
        _type: "language",
        name_en_US: "Deep Speech",
        type: "Exotic",
        typicalSpeakers_en_US: ["Aboleths", "Cloakers"],
      },
    ]);
  });
});
