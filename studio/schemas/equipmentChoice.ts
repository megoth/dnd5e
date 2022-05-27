export default {
  name: "equipmentChoice",
  title: "Equipment Choice",
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
      of: [{ type: "equipment" }],
    },
  ],
};
