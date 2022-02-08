import { v4 as uuidv4 } from "uuid";
import { getDnd5eUrl } from "../../manage-data";
import migrateRuleData from "./index";

const ruleSectionRelativeUrl =
  "/api/rule-sections/fantasy-historical-pantheons";
const ruleSectionUrl = getDnd5eUrl(ruleSectionRelativeUrl);
const ruleSectionId = uuidv4();

const preparedDataMap = {
  [ruleSectionUrl]: { _id: ruleSectionId },
};

const ruleUrl = "https://www.dnd5eapi.co/api/rules/appendix";
const rule = {
  name: "Appendix",
  index: "appendix",
  desc: "# Appendix\n",
  subsections: [
    {
      name: "Fantasy-Historical Pantheons",
      index: "fantasy-historical-pantheons",
      url: "/api/rule-sections/fantasy-historical-pantheons",
    },
  ],
  url: "/api/rules/appendix",
};

describe("migrateRuleData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateRuleData(preparedDataMap)({
        [ruleUrl]: rule,
      })
    ).toEqual([
      {
        _type: "rule",
        name_en_US: rule.name,
        description_en_US: rule.desc,
        subsections: [
          {
            _key: expect.any(String),
            _type: "reference",
            _ref: ruleSectionId,
          },
        ],
      },
    ]);
  });
});
