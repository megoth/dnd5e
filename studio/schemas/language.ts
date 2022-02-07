import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "language",
  title: "Language",
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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["Standard", "Exotic"],
      },
    },
    ...getGroupField({
      name: "typicalSpeakers",
      title: "Typical speakers",
      type: "array",
      of: [{ type: "string" }],
    }),
    ...getGroupField({
      name: "script",
      title: "Script",
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
