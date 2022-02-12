export default {
  name: "actionOptions",
  title: "Action Options",
  type: "object",
  fields: [
    {
      name: "choose",
      title: "Choose",
      type: "number",
    },
    {
      name: "from",
      title: "From",
      type: "array",
      of: [{ type: "actionOption" }],
    },
  ],
};
