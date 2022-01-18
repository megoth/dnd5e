import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "difficultyClass",
  title: "Difficulty Class",
  type: "object",
  groups: getLanguagesAsGroups(),
  fields: [
    {
      name: "difficultyClassType",
      title: "Difficulty Class Type",
      type: "reference",
      to: { type: "abilityScore" },
    },
    {
      name: "difficultyClassValue",
      title: "Difficulty Class Value",
      type: "number",
    },
    {
      name: "successType",
      title: "Success Type",
      type: "string",
      options: {
        list: ["full", "half", "none", "other"],
      },
    },
    ...getGroupField({
      name: "description",
      title: "Description",
      type: "string",
    }),
  ],
};
