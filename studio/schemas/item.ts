export default {
  name: "item",
  title: "Item",
  type: "object",
  fields: [
    {
      name: "item",
      title: "Item",
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
