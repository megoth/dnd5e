export default {
  name: "damageChoice",
  title: "Damage Choice",
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
      of: [{ type: "damage" }],
    },
  ],
};
