import { v4 as uuidv4 } from "uuid";
import migrateAlignmentData from "./index";

const alignmentUrl = "https://www.dnd5eapi.co/api/alignments/lawful-good";
const alignment = {
  index: "lawful-good",
  name: "Lawful Good",
  abbreviation: "LG",
  desc: "Lawful good (LG) creatures can be counted on to do the right thing as expected by society. Gold dragons, paladins, and most dwarves are lawful good.",
  url: "/api/alignments/lawful-good",
};
const alignmentId = uuidv4();
const alignmentMap = {
  [alignmentUrl]: alignment,
};

describe("migrateAlignmentData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateAlignmentData({})(alignmentMap)).toEqual([
      {
        _type: "alignment",
        name_en_US: alignment.name,
        abbreviation_en_US: alignment.abbreviation,
        description_en_US: alignment.desc,
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateAlignmentData({
        [alignmentUrl]: {
          _id: alignmentId,
          name_en_US: "TEST",
        },
      })(alignmentMap)
    ).toEqual([
      {
        _id: alignmentId,
        _type: "alignment",
        name_en_US: alignment.name,
        abbreviation_en_US: alignment.abbreviation,
        description_en_US: alignment.desc,
      },
    ]);
  });
});
