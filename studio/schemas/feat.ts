import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "feat",
  title: "Feat",
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
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "abilityPrerequisite" }],
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
