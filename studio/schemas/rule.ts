import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "rule",
  title: "Rule",
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
      type: "markdown",
    }),
    {
      name: "subsections",
      title: "Subsections",
      type: "array",
      of: [{ type: "reference", to: { type: "ruleSection" } }],
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
