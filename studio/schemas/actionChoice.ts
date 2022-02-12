export default {
  name: "actionChoice",
  title: "Action Choice",
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
      of: [{ type: "action" }],
    },
  ],
};
