import { ActionUsageData } from "../../download/api.types";
import { ActionUsage } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";

export function migrateActionUsageValue(value: ActionUsageData): ActionUsage {
  return {
    _type: "actionUsage",
    type: value.type,
    ...migrateProperty<ActionUsage>("times", value.times),
    ...migrateProperty<ActionUsage>("dice", value.dice),
    ...migrateProperty<ActionUsage>("minValue", value.min_value),
    ...migrateProperty<ActionUsage>("restType", value.rest_types),
  };
}

export default function migrateActionUsage<T>(
  key: keyof T,
  value?: ActionUsageData
): Record<string, ActionUsage> {
  return value ? { [key]: migrateActionUsageValue(value) } : {};
}
