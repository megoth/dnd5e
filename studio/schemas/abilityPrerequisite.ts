export default {
  name: "abilityPrerequisite",
  title: "Ability Prerequisite",
  type: "object",
  fields: [
    {
      name: "abilityScore",
      title: "Ability Score",
      type: "reference",
      to: { type: "abilityScore" },
    },
    {
      name: "minimumScore",
      title: "Minimum Score",
      type: "number",
    },
  ],
};
