import migrateMagicSchoolData from "./index";

const preparedDataMap = {};
const magicSchoolUrl = "https://www.dnd5eapi.co/api/magic-schools/necromancy";
const magicSchool = {
  index: "necromancy",
  name: "Necromancy",
  desc: "Necromancy spells manipulate the energies of life and death. Such spells can grant an extra reserve of life force, drain the life energy from another creature, create the undead, or even bring the dead back to life.",
  url: "/api/magic-schools/necromancy",
};

describe("migrateMagicSchoolData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateMagicSchoolData(preparedDataMap)({
        [magicSchoolUrl]: magicSchool,
      })
    ).toEqual([
      {
        _type: "magicSchool",
        name_en_US: magicSchool.name,
        description_en_US: magicSchool.desc,
      },
    ]);
  });
});
