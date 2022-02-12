import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "action",
  title: "Action",
  type: "object",
  groups: getLanguagesAsGroups(),
  fields: [
    ...getGroupField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    {
      name: "attackBonus",
      title: "Attack Bonus",
      type: "number",
    },
    {
      name: "damage",
      title: "Damage",
      type: "array",
      of: [{ type: "damage" }],
    },
    {
      name: "damageChoice",
      title: "Damage Choice",
      type: "array",
      of: [{ type: "damageChoice" }],
    },
    ...getGroupField({
      name: "description",
      title: "Description",
      type: "markdown",
    }),
    {
      name: "dc",
      title: "Difficulty Class",
      type: "difficultyClass",
    },
    {
      name: "options",
      title: "Options",
      type: "actionOptions",
    },
    {
      name: "usage",
      title: "Usage",
      type: "actionUsage",
    },
    {
      name: "attacks",
      title: "Attacks",
      type: "array",
      of: [{ type: "action" }],
    },
    {
      name: "attackOptions",
      title: "Attack Options",
      type: "actionChoice",
    },
  ],
};
