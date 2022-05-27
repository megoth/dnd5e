export default {
  name: "multiClassing",
  title: "Multi Classing",
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
