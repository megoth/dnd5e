import migrateDamageAtCharacterLevels from "./index";

describe("migrateDamageAtCharacterLevels", () => {
  it("handles undefined values", () => {
    expect(migrateDamageAtCharacterLevels("test")).toEqual({});
  });

  it("migrates damage at character levels", () => {
    const damageMap = {
      "1": "1d4",
      "5": "2d4",
      "11": "3d4",
      "17": "4d4",
    };
    expect(migrateDamageAtCharacterLevels("test", damageMap)).toEqual({
      test: [
        {
          _type: "damageAtCharacterLevel",
          damage: damageMap["1"],
          level: 1,
        },
        {
          _type: "damageAtCharacterLevel",
          damage: damageMap["5"],
          level: 5,
        },
        {
          _type: "damageAtCharacterLevel",
          damage: damageMap["11"],
          level: 11,
        },
        {
          _type: "damageAtCharacterLevel",
          damage: damageMap["17"],
          level: 17,
        },
      ],
    });
  });
});
