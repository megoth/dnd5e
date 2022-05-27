export default {
  name: "startingEquipmentChoice",
  title: "Starging Equipment Choice",
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
      of: [{ type: "startingEquipmentOption" }],
    },
  ],
};
