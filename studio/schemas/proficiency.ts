import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "proficiency",
  title: "Proficiency",
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
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          "Armor",
          "Artisans Tools",
          "Gaming Sets",
          "Musical Instruments",
          "Other",
          "Saving Throws",
          "Skills",
          "Vehicles",
          "Weapons",
        ],
      },
    },
    {
      name: "skillReference",
      title: "Skill Reference",
      type: "reference",
      to: { type: "skill" },
    },
    {
      name: "equipmentReference",
      title: "Equipment Reference",
      type: "reference",
      to: { type: "equipment" },
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
