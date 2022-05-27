export default {
  name: "startingEquipmentOption",
  title: "Starting Equipment Option",
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
    {
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "reference", to: { type: "proficiency" } }],
    },
    {
      name: "equipmentOption",
      title: "Equipment Option",
      type: "equipmentChoice",
    },
    {
      name: "equipmentCategory",
      title: "Equipment Category",
      type: "equipmentCategory",
    },
  ],
};
