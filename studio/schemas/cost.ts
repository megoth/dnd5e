export default {
  name: "cost",
  title: "Cost",
  type: "object",
  fields: [
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
    },
    {
      name: "unit",
      title: "Unit",
      type: "string",
      options: {
        list: ["cp", "sp", "ep", "gp", "pp"],
      },
    },
  ],
};
