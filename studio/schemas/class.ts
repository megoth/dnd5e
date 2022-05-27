import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "class",
  title: "Class",
  type: "document",
  groups: getLanguagesAsGroups(),
  fields: [
    ...getGroupField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name_en_US",
        maxLength: 96,
      },
    },
    {
      name: "hitDie",
      title: "Hit Die",
      type: "number",
    },
    {
      name: "proficiencies",
      title: "Proficiencies",
      type: "array",
      of: [{ type: "reference", to: { type: "proficiency" } }],
    },
    {
      name: "proficiencyChoices",
      title: "Proficiency Choices",
      type: "array",
      of: [{ type: "proficiencyChoice" }],
    },
    {
      name: "savingThrows",
      title: "Saving Throws",
      type: "array",
      of: [{ type: "reference", to: { type: "abilityScore" } }],
    },
    {
      name: "startingEquipment",
      title: "Starting Equipment",
      type: "array",
      of: [{ type: "equipmentStack" }],
    },
    {
      name: "startingEquipmentOptions",
      title: "Starting Equipment Options",
      type: "array",
      of: [{ type: "startingEquipmentChoice" }],
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "name_en_US",
      subtitle: "slug.current",
    },
  },
};
