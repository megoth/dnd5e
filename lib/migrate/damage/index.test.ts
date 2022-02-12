import { migrateDamageValue } from "./index";

describe("migrateDamageValue", () => {
  it("migrates spell damage by slot level", () => {
    const damageAtSlotLevel = {
      7: "10d6",
    };
    expect(
      migrateDamageValue(
        {},
        {
          damage_at_slot_level: damageAtSlotLevel,
        }
      )
    ).toEqual({
      _type: "damage",
      damageAtSlotLevel: [
        {
          _type: "damageAtSlotLevel",
          damage: damageAtSlotLevel[7],
          slot: 7,
        },
      ],
    });
  });
});
