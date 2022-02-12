export default {
  name: "traitSpecific",
  title: "Trait Specifics",
  type: "object",
  fields: [
    {
      name: "damageType",
      title: "Damage Type",
      type: "reference",
      to: { type: "damageType" },
    },
    {
      name: "breathWeapon",
      title: "Breath Weapon",
      type: "action",
    },
    {
      name: "subtraitOptions",
      title: "Subtrait Options",
      type: "traitChoice",
    },
    {
      name: "spellOptions",
      title: "Spell Options",
      type: "spellChoice",
    },
  ],
};
