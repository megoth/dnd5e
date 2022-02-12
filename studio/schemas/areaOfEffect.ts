export default {
  name: "areaOfEffect",
  title: "Area of Effect",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["cone", "cube", "cylinder", "line", "sphere"],
      },
    },
    {
      name: "size",
      title: "Size",
      type: "number",
    },
  ],
};
