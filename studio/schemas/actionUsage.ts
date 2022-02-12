export default {
  name: "actionUsage",
  title: "Action Usage",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          "at will",
          "per day",
          "per rest",
          "recharge after rest",
          "recharge on roll",
        ],
      },
    },
    {
      name: "times",
      title: "Times",
      type: "number",
    },
    {
      name: "dice",
      title: "Dice",
      type: "string",
    },
    {
      name: "minValue",
      title: "Minimum value",
      type: "number",
    },
    {
      name: "restType",
      title: "Rest Type",
      type: "string",
      options: {
        list: ["long", "short"],
      },
    },
  ],
};
