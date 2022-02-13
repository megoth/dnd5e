import { v4 as uuidv4 } from "uuid";
import { getDnd5eUrl } from "../../../manage-data";
import migrateTraitSpecificSpell from "./index";

const spellRelativeUrl = "/api/spells/light";
const spellUrl = getDnd5eUrl(spellRelativeUrl);
export const spellId = uuidv4();

export const preparedDataMap = {
  [spellUrl]: { _id: spellId },
};
export const spellOptionsTraitSpecific = {
  spell_options: {
    choose: 1,
    from: [
      {
        index: "light",
        name: "Light",
        url: spellRelativeUrl,
      },
    ],
    type: "spell",
  },
};

describe("migrateTraitSpecificSpell", () => {
  it("migrates spell options", () => {
    expect(
      migrateTraitSpecificSpell(spellOptionsTraitSpecific, preparedDataMap)
    ).toEqual({
      spellOptions: {
        _type: "spellChoice",
        choose: spellOptionsTraitSpecific.spell_options.choose,
        from: [
          {
            _key: expect.any(String),
            _ref: spellId,
            _type: "reference",
          },
        ],
      },
    });
  });
});
