import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "actionReference",
  title: "Action Reference",
  type: "object",
  groups: getLanguagesAsGroups(),
  fields: [
    ...getGroupField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "count",
      title: "Count",
      type: "string",
    },
    ...getGroupField({
      name: "notes",
      title: "Notes",
      type: "string",
    }),
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: ["ability", "magic", "melee", "ranged"],
      },
    },
  ],
};
