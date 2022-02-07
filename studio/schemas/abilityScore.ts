import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "abilityScore",
  title: "Ability Score",
  type: "document",
  groups: getLanguagesAsGroups(),
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    ...getGroupField({
      name: "fullName",
      title: "Full name",
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
      type: "markdown",
    }),
    {
      name: "url",
      title: "URL",
      type: "url",
    },
  ],
  preview: {
    select: {
      title: "fullName_en_US",
      subtitle: "slug.current",
    },
  },
};
