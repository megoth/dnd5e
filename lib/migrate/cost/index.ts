import { CostData } from "../../download/api.types";
import { Cost } from "../../sanity/schema-types";
import { migrateOptional } from "../../manage-data";

export default function migrateCost(value: CostData): Cost {
  return {
    _type: "cost",
    ...migrateOptional<Cost>("quantity", value.quantity),
    ...migrateOptional<Cost>("unit", value.unit),
  };
}
