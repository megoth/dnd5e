import { v4 as uuidv4 } from "uuid";
import migrateConditionData from "./condition";

const conditionUrl = "https://www.dnd5eapi.co/api/conditions/frightened";
const condition = {
  index: "frightened",
  name: "Frightened",
  desc: [
    "- A frightened creature has disadvantage on ability checks and attack rolls while the source of its fear is within line of sight.",
    "- The creature can't willingly move closer to the source of its fear.",
  ],
  url: "/api/conditions/frightened",
};
const conditionId = uuidv4();
const conditionMap = {
  [conditionUrl]: condition,
};

describe("migrateAlignmentData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(migrateConditionData({})(conditionMap)).toEqual([
      {
        _type: "condition",
        name_en_US: condition.name,
        description_en_US: condition.desc.join("\n\n"),
      },
    ]);
  });

  it("preserves id from old data if available", () => {
    expect(
      migrateConditionData({
        [conditionUrl]: {
          _id: conditionId,
          name_en_US: "TEST",
        },
      })(conditionMap)
    ).toEqual([
      {
        _id: conditionId,
        _type: "condition",
        name_en_US: condition.name,
        description_en_US: condition.desc.join("\n\n"),
      },
    ]);
  });
});
