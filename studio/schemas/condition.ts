import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "condition",
  title: "Condition",
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