import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "spell",
  title: "Spell",
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
    ...getGroupField({
      name: "description",
      title: "Description",
      type: "markdown",
    }),
    ...getGroupField({
      name: "higherLevel",
      title: "Higher Level",
      type: "markdown",
    }),
    {
      name: "range",
      title: "Range",
      type: "string",
    },
    {
      name: "components",
      title: "Components",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["M", "S", "V"],
      },
    },
    {
      name: "material",
      title: "Material",
      type: "string",
    },
    {
      name: "ritual",
      title: "Ritual",
      type: "boolean",
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
    },
    {
      name: "concentration",
      title: "Concentration",
      type: "boolean",
    },
    {
      name: "castingTime",
      title: "Casting Time",
      type: "string",
    },
    {
      name: "level",
      title: "Level",
      type: "number",
    },
    {
      name: "healAtSlotLevel",
      title: "Heal at Slot Level",
      type: "array",
      of: [{ type: "healAtSlotLevel" }],
    },
    {
      name: "attackType",
      title: "Attack Type",
      type: "string",
      options: {
        list: ["melee", "ranged"],
      },
    },
    {
      name: "damage",
      title: "Damage",
      type: "damage",
    },
    {
      name: "dc",
      title: "Difficulty Class",
      type: "difficultyClass",
    },
    {
      name: "areaOfEffect",
      title: "Area of Effect",
      type: "areaOfEffect",
    },
    {
      name: "school",
      title: "School",
      type: "reference",
      to: { type: "magicSchool" },
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
