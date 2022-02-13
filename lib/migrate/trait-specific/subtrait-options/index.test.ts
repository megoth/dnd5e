import { v4 as uuidv4 } from "uuid";
import migrateTraitSpecificSubtrait from "./index";
import { getDnd5eUrl } from "../../../manage-data";

const subtraitRelativeUrl = "/api/traits/draconic-ancestry";
const subtraitUrl = getDnd5eUrl(subtraitRelativeUrl);
export const subtraitId = uuidv4();
export const preparedDataMap = {
  [subtraitUrl]: { _id: subtraitId },
};

export const subtraitOptionsTraitSpecific = {
  subtrait_options: {
    choose: 1,
    from: [
      {
        index: "draconic-ancestry-black",
        name: "Draconic Ancestry (Black)",
        url: subtraitRelativeUrl,
      },
    ],
    type: "trait",
  },
};

describe("migrateTraitSpecificSubtrait", () => {
  it("migrates subtrait options", () => {
    expect(
      migrateTraitSpecificSubtrait(
        subtraitOptionsTraitSpecific,
        preparedDataMap
      )
    ).toEqual({
      subtraitOptions: {
        _type: "traitChoice",
        choose: subtraitOptionsTraitSpecific.subtrait_options.choose,
        from: [
          {
            _key: expect.any(String),
            _ref: subtraitId,
            _type: "reference",
          },
        ],
      },
    });
  });
});
