import { ActionUsageData } from "../../download/api.types";
import { ActionUsage } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";

export default function migrateActionUsage(
  value: ActionUsageData
): ActionUsage {
  return {
    _type: "actionUsage",
    type: value.type,
    ...migrateOptional<ActionUsage>("times", value.times),
    ...migrateOptional<ActionUsage>("dice", value.dice),
    ...migrateOptional<ActionUsage>("minValue", value.min_value),
    ...migrateOptional<ActionUsage>("restType", value.rest_types),
  };
}
