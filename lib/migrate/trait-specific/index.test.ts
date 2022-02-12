import { v4 as uuidv4 } from "uuid";
import { DragonkindTrait } from "../../download/api.types";
import { getDnd5eUrl } from "../../manage-data";
import {
  migrateTraitSpecificDragonkind,
  migrateTraitSpecificSpell,
  migrateTraitSpecificSubtrait,
  migrateTraitSpecificValue,
} from "./index";

const damageTypeRelativeUrl = "/api/damage-types/acid";
const damageTypeUrl = getDnd5eUrl(damageTypeRelativeUrl);
const damageTypeId = uuidv4();
const spellRelativeUrl = "/api/spells/light";
const spellUrl = getDnd5eUrl(spellRelativeUrl);
const spellId = uuidv4();
const subtraitRelativeUrl = "/api/traits/draconic-ancestry";
const subtraitUrl = getDnd5eUrl(subtraitRelativeUrl);
const subtraitId = uuidv4();
export const preparedDataMap = {
  [damageTypeUrl]: { _id: damageTypeId },
  [spellUrl]: { _id: spellId },
  [subtraitUrl]: { _id: subtraitId },
};

export const dragonkindTraitSpecific: DragonkindTrait = {
  damage_type: {
    index: "acid",
    name: "Acid",
    url: damageTypeRelativeUrl,
  },
  breath_weapon: {
    name: "Breath Weapon",
  },
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

describe("migrateTraitSpecificDragonkind", () => {
  it("migrates trait specific data for dragonkind", () => {
    expect(
      migrateTraitSpecificDragonkind(preparedDataMap, dragonkindTraitSpecific)
    ).toEqual({
      breathWeapon: {
        _type: "action",
        name_en_US: dragonkindTraitSpecific.breath_weapon.name,
      },
      damageType: {
        _ref: damageTypeId,
        _type: "reference",
      },
    });
  });
});

describe("migrateTraitSpecificSubtrait", () => {
  it("migrates subtrait options", () => {
    expect(
      migrateTraitSpecificSubtrait(
        preparedDataMap,
        subtraitOptionsTraitSpecific
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

describe("migrateTraitSpecificSpell", () => {
  it("migrates spell options", () => {
    expect(
      migrateTraitSpecificSpell(preparedDataMap, spellOptionsTraitSpecific)
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

describe("migrateTraitSpecificValue", () => {
  it("migrates dragonkind specific trait", () => {
    expect(
      migrateTraitSpecificValue(preparedDataMap, dragonkindTraitSpecific)
    ).toEqual({
      _type: "traitSpecific",
      ...migrateTraitSpecificDragonkind(
        preparedDataMap,
        dragonkindTraitSpecific
      ),
    });
  });

  it("migrates subtrait specific trait", () => {
    expect(
      migrateTraitSpecificValue(preparedDataMap, subtraitOptionsTraitSpecific)
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
      migrateTraitSpecificValue(preparedDataMap, spellOptionsTraitSpecific)
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
      migrateTraitSpecificValue(preparedDataMap, {
        ...dragonkindTraitSpecific,
        ...subtraitOptionsTraitSpecific,
        ...spellOptionsTraitSpecific,
      })
    ).toEqual({
      _type: "traitSpecific",
      ...migrateTraitSpecificDragonkind(
        preparedDataMap,
        dragonkindTraitSpecific
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
