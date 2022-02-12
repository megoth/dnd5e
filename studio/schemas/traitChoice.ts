export default {
  name: "traitChoice",
  title: "Trait Choice",
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
      of: [{ type: "reference", to: { type: "trait" } }],
    },
  ],
};
