import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "trait",
  title: "Trait",
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
    ...getGroupField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    {
      name: "parent",
      title: "Parent",
      type: "reference",
      to: { type: "trait" },
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
      type: "proficiencyChoice",
    },
    {
      name: "traitSpecific",
      title: "Trait Specific",
      type: "traitSpecific",
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
