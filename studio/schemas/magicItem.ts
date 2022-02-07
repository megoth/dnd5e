import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "magicItem",
  title: "Magic Item",
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
      name: "equipmentCategory",
      title: "Equipment Category",
      type: "reference",
      to: { type: "equipmentCategory" },
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
      title: "name_en_US",
      subtitle: "slug.current",
    },
  },
};
