export default {
  name: "damage",
  title: "Damage",
  type: "object",
  fields: [
    {
      name: "damageDice",
      title: "Damage Dice",
      type: "string",
    },
    {
      name: "damageType",
      title: "Damage Type",
      type: "reference",
      to: { type: "damageType" },
    },
    {
      name: "dc",
      title: "Difficulty Class",
      type: "difficultyClass",
    },
    {
      name: "damageAtCharacterLevel",
      title: "Damage at Character Level",
      type: "array",
      of: [{ type: "damageAtCharacterLevel" }],
    },
  ],
};
