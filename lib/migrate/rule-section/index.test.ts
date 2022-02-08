import migrateRuleSectionData from "./index";

const ruleSectionUrl =
  "https://www.dnd5eapi.co/api/rule-sections/advantage-and-disadvantage";
const ruleSection = {
  name: "Advantage and Disadvantage",
  index: "advantage-and-disadvantage",
  desc: "## Advantage and Disadvantage\n\nSometimes a special ability or spell tells you that you have advantage or disadvantage on an ability check, a saving throw, or an attack roll. When that happens, you roll a second d20 when you make the roll. Use the higher of the two rolls if you have advantage, and use the lower roll if you have disadvantage. For example, if you have disadvantage and roll a 17 and a 5, you use the 5. If you instead have advantage and roll those numbers, you use the 17.\n\nIf multiple situations affect a roll and each one grants advantage or imposes disadvantage on it, you don't roll more than one additional d20. If two favorable situations grant advantage, for example, you still roll only one additional d20.\n\nIf circumstances cause a roll to have both advantage and disadvantage, you are considered to have neither of them, and you roll one d20. This is true even if multiple circumstances impose disadvantage and only one grants advantage or vice versa. In such a situation, you have neither advantage nor disadvantage.\n\nWhen you have advantage or disadvantage and something in the game, such as the halfling's Lucky trait, lets you reroll the d20, you can reroll only one of the dice. You choose which one. For example, if a halfling has advantage or disadvantage on an ability check and rolls a 1 and a 13, the halfling could use the Lucky trait to reroll the 1.\n\nYou usually gain advantage or disadvantage through the use of special abilities, actions, or spells. Inspiration can also give a character advantage. The\n\nGM can also decide that circumstances influence a roll in one direction or the other and grant advantage or impose disadvantage as a result.\n",
  url: "/api/rule-sections/advantage-and-disadvantage",
};

describe("migrateRuleSectionData", () => {
  it("migrates data from D&D5e API to Sanity CMS", () => {
    expect(
      migrateRuleSectionData({})({
        [ruleSectionUrl]: ruleSection,
      })
    ).toEqual([
      {
        _type: "ruleSection",
        name_en_US: ruleSection.name,
        description_en_US: ruleSection.desc,
      },
    ]);
  });
});
