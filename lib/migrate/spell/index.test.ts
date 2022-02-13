import { v4 as uuidv4 } from "uuid";
import { getDnd5eUrl, migrateToMarkdown } from "../../manage-data";
import migrateSpellData from "./index";
import { SpellData } from "../../download/api.types";
import { getReference } from "../common";

const schoolRelativeUrl = "/api/magic-schools/abjuration";
const schoolUrl = getDnd5eUrl(schoolRelativeUrl);
const schoolId = uuidv4();
const damageTypeRelativeUrl = "/api/damage-types/necrotic";
const damageTypeUrl = getDnd5eUrl(damageTypeRelativeUrl);
const damageTypeId = uuidv4();
const abilityScoreRelativeUrl = "/api/ability-scores/dex";
const abilityScoreUrl = getDnd5eUrl(abilityScoreRelativeUrl);
const abilityScoreId = uuidv4();

const preparedDataMap = {
  [schoolUrl]: { _id: schoolId },
  [damageTypeUrl]: { _id: damageTypeId },
  [abilityScoreUrl]: { _id: abilityScoreId },
};

const spellUrl = "https://www.dnd5eapi.co/api/spells/death-ward";
const simpleSpell: SpellData = {
  index: "death-ward",
  name: "Death Ward",
  desc: [
    "You touch a creature and grant it a measure of protection from death.",
    "The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends.",
    "If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends.",
  ],
  range: "Touch",
  components: ["V", "S"],
  ritual: false,
  duration: "8 hours",
  concentration: false,
  casting_time: "1 action",
  level: 4,
  school: {
    index: "abjuration",
    name: "Abjuration",
    url: schoolRelativeUrl,
  },
  classes: [],
  subclasses: [],
  url: "/api/spells/death-ward",
};
const damageAtSlotLevel = {
  damage_type: {
    index: "necrotic",
    name: "Necrotic",
    url: damageTypeRelativeUrl,
  },
  damage_at_slot_level: {
    "3": "3d6",
  },
};
const complexSpell: SpellData = {
  index: "death-ward",
  name: "Death Ward",
  desc: [
    "You touch a creature and grant it a measure of protection from death.",
    "The first time the target would drop to 0 hit points as a result of taking damage, the target instead drops to 1 hit point, and the spell ends.",
    "If the spell is still in effect when the target is subjected to an effect that would kill it instantaneously without dealing damage, that effect is instead negated against the target, and the spell ends.",
  ],
  higher_level: [
    "When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.",
  ],
  range: "Touch",
  components: ["V", "S"],
  material: "A wing feather from any bird.",
  ritual: false,
  duration: "8 hours",
  concentration: false,
  casting_time: "1 action",
  level: 4,
  heal_at_slot_level: {
    "2": "2d8 + MOD",
  },
  attack_type: "melee",
  damage: damageAtSlotLevel,
  dc: {
    dc_type: {
      index: "dex",
      name: "DEX",
      url: abilityScoreRelativeUrl,
    },
    dc_success: "half",
  },
  area_of_effect: {
    type: "line",
    size: 60,
  },
  school: {
    index: "abjuration",
    name: "Abjuration",
    url: schoolRelativeUrl,
  },
  classes: [],
  subclasses: [],
  url: "/api/spells/death-ward",
};

describe("migrateSpellData", () => {
  it("migrates simple data", () => {
    expect(
      migrateSpellData(preparedDataMap)({
        [spellUrl]: simpleSpell,
      })
    ).toEqual([
      {
        _type: "spell",
        name_en_US: simpleSpell.name,
        description_en_US: migrateToMarkdown(simpleSpell.desc),
        range: simpleSpell.range,
        components: simpleSpell.components,
        ritual: simpleSpell.ritual,
        duration: simpleSpell.duration,
        concentration: simpleSpell.concentration,
        castingTime: simpleSpell.casting_time,
        school: getReference(preparedDataMap, simpleSpell.school.url),
      },
    ]);
  });

  it("migrates complex data", () => {
    expect(
      migrateSpellData(preparedDataMap)({
        [spellUrl]: complexSpell,
      })
    ).toEqual([
      {
        _type: "spell",
        name_en_US: complexSpell.name,
        description_en_US: migrateToMarkdown(complexSpell.desc),
        higherLevel_en_US: migrateToMarkdown(complexSpell.higher_level),
        range: complexSpell.range,
        components: complexSpell.components,
        material: complexSpell.material,
        ritual: complexSpell.ritual,
        duration: complexSpell.duration,
        concentration: complexSpell.concentration,
        castingTime: complexSpell.casting_time,
        healAtSlotLevel: [
          {
            _key: expect.any(String),
            _type: "healAtSlotLevel",
            slot: 2,
            heal: complexSpell.heal_at_slot_level["2"],
          },
        ],
        attackType: complexSpell.attack_type,
        damage: {
          _type: "damage",
          damageAtSlotLevel: [
            {
              _key: expect.any(String),
              _type: "damageAtSlotLevel",
              damage: damageAtSlotLevel.damage_at_slot_level["3"],
              slot: 3,
            },
          ],
          damageType: {
            _ref: damageTypeId,
            _type: "reference",
          },
        },
        dc: {
          _type: "difficultyClass",
          difficultyClassType: {
            _ref: abilityScoreId,
            _type: "reference",
          },
          successType: complexSpell.dc.dc_success,
        },
        areaOfEffect: {
          _type: "areaOfEffect",
          size: complexSpell.area_of_effect.size,
          type: complexSpell.area_of_effect.type,
        },
        school: {
          _ref: schoolId,
          _type: "reference",
        },
      },
    ]);
  });
});
