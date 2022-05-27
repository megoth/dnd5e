export default {
  name: "equipmentStack",
  title: "Equipment Stack",
  type: "object",
  fields: [
    {
      name: "equipment",
      title: "Equipment",
      type: "reference",
      to: { type: "equipment" },
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
    },
  ],
};
