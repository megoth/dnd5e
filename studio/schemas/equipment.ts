import { getGroupField, getLanguagesAsGroups } from "../config/languages";

export default {
  name: "equipment",
  title: "Equipment",
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
        source: "name_en_US",
        maxLength: 96,
      },
    },
    ...getGroupField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    {
      name: "armorCategory",
      title: "Armor Category",
      type: "string",
    },
    {
      name: "armorClass",
      title: "Armor Class",
      type: "armorClass",
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "string",
    },
    {
      name: "rangeCategory",
      title: "Range Category",
      type: "string",
    },
    {
      name: "damage",
      title: "Damage",
      type: "damage",
    },
    {
      name: "equipmentCategory",
      title: "Equipment Category",
      type: "reference",
      to: { type: "equipmentCategory" },
    },
    {
      name: "gearCategory",
      title: "Gear Category",
      type: "reference",
      to: { type: "equipmentCategory" },
    },
    {
      name: "contents",
      title: "Contents",
      type: "array",
      of: [{ type: "item" }],
    },
    {
      name: "cost",
      title: "Cost",
      type: "cost",
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "number",
    },
    {
      name: "url",
      title: "URL",
      type: "url",
    },
    {
      name: "properties",
      title: "Properties",
      type: "array",
      of: [{ type: "reference", to: { type: "weaponProperty" } }],
    },
    {
      name: "range",
      title: "Range",
      type: "range",
    },
    ...getGroupField({
      name: "special",
      title: "Special",
      type: "string",
    }),
    {
      name: "speed",
      title: "Speed",
      type: "vehicleSpeed",
    },
    {
      name: "strMinimum",
      title: "Strength Minimum",
      type: "number",
    },
    {
      name: "stealthDisadvantage",
      title: "Stealth disadvantage",
      type: "boolean",
    },
    {
      name: "throwRange",
      title: "Throw Range",
      type: "range",
    },
    {
      name: "toolCategory",
      title: "Tool Category",
      type: "string",
      options: {
        list: [
          "Artisan&#39;s Tools",
          "Gaming Sets",
          "Musical Instrument",
          "Other Tools",
        ],
      },
    },
    {
      name: "twoHandedDamage",
      title: "Two Handed Damage",
      type: "damage",
    },
    {
      name: "vehicleCategory",
      title: "Vehicle Category",
      type: "string",
      options: {
        list: [
          "Mounts and Other Animals",
          "Tack, Harness, and Drawn Vehicles",
          "Waterborne Vehicles",
        ],
      },
    },
    {
      name: "weaponRange",
      title: "Weapon Range",
      type: "string",
      options: {
        list: ["Melee", "Ranged"],
      },
    },
    {
      name: "weight",
      title: "Weight",
      type: "number",
    },
  ],
  preview: {
    select: {
      title: "name_en_US",
      subtitle: "slug.current",
    },
  },
};
