export default {
  name: "spellChoice",
  title: "Spell Choice",
  type: "object",
  fields: [
    {
      name: "choose",
      title: "Choose",
      type: "number",
    },
    {
      name: "from",
      title: "From",
      type: "array",
      of: [{ type: "reference", to: { type: "spell" } }],
    },
  ],
};
