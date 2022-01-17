import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "skill",
  title: "Skill",
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
      type: "string",
    }),
    {
      name: "abilityScore",
      title: "Ability Score",
      type: "reference",
      to: { type: "abilityScore" },
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
