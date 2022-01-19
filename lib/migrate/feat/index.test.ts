import { v4 as uuidv4 } from "uuid";
import { getDnd5eUrl } from "../../manage-data";
import migrateFeatData from "./index";
import abilityPrerequisite from "../../../studio/schemas/abilityPrerequisite";

const featUrl = "https://www.dnd5eapi.co/api/skills/arcana";
const abilityScoreRelativeUrl = "/api/ability-scores/str";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const feat = {
  index: "grappler",
  name: "Grappler",
  prerequisites: [
    {
      ability_score: {
        index: "str",
        name: "STR",
        url: abilityScoreRelativeUrl,
      },
      minimum_score: 13,
    },
  ],
  desc: [
    "You’ve developed the Skills necessary to hold your own in close--quarters Grappling. You gain the following benefits:",
    "- You have advantage on Attack Rolls against a creature you are Grappling.",
    "- You can use your action to try to pin a creature Grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both Restrained until the grapple ends.",
  ],
  url: "/api/feats/grappler",
};
const abilityScoreId = uuidv4();
const preparedDataMap = {
  [abilityScoreUrl]: { _id: abilityScoreId },
};

describe("migrateFeatData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateFeatData(preparedDataMap)({
        [featUrl]: feat,
      })
    ).toEqual([
      {
        _type: "feat",
        name_en_US: feat.name,
        prerequisites: [
          {
            _type: "abilityPrerequisite",
            abilityScore: {
              _type: "reference",
              _ref: abilityScoreId,
            },
            minimumScore: feat.prerequisites[0].minimum_score,
          },
        ],
        description_en_US: feat.desc.join("\n\n"),
      },
    ]);
  });
});
