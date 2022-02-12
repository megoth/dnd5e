export default {
  name: "actionOption",
  title: "Action Option",
  type: "object",
  fields: [
    {
      name: "attacks",
      title: "Attacks",
      type: "array",
      of: [{ type: "actionReference" }],
    },
  ],
};
