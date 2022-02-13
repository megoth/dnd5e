import migrateTraitSpecific from "./index";
import migrateTraitSpecificDragonkind from "./dragonkind";
import {
  dragonkindTraitSpecific,
  preparedDataMap as dragonkindDataMap,
} from "./dragonkind/index.test";
import {
  preparedDataMap as subtraitDataMap,
  subtraitId,
  subtraitOptionsTraitSpecific,
} from "./subtrait-options/index.test";
import {
  preparedDataMap as spellDataMap,
  spellId,
  spellOptionsTraitSpecific,
} from "./spell-options/index.test";

export const preparedDataMap = {
  ...dragonkindDataMap,
  ...subtraitDataMap,
  ...spellDataMap,
};

export const traitSpecific = {
  ...dragonkindTraitSpecific,
  ...subtraitOptionsTraitSpecific,
  ...spellOptionsTraitSpecific,
};

describe("migrateTraitSpecific", () => {
  it("migrates dragonkind specific trait", () => {
    expect(
      migrateTraitSpecific(dragonkindTraitSpecific, preparedDataMap)
    ).toEqual({
      _type: "traitSpecific",
      ...migrateTraitSpecificDragonkind(
        dragonkindTraitSpecific,
        preparedDataMap
      ),
    });
  });

  it("migrates subtrait specific trait", () => {
    expect(
      migrateTraitSpecific(subtraitOptionsTraitSpecific, preparedDataMap)
    ).toEqual({
      _type: "traitSpecific",
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

  it("migrates spell specific trait", () => {
    expect(
      migrateTraitSpecific(spellOptionsTraitSpecific, preparedDataMap)
    ).toEqual({
      _type: "traitSpecific",
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

  it("migrates all specificities of traits", () => {
    expect(
      migrateTraitSpecific(
        {
          ...dragonkindTraitSpecific,
          ...subtraitOptionsTraitSpecific,
          ...spellOptionsTraitSpecific,
        },
        preparedDataMap
      )
    ).toEqual({
      _type: "traitSpecific",
      ...migrateTraitSpecificDragonkind(
        dragonkindTraitSpecific,
        preparedDataMap
      ),
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
