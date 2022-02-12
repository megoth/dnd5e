import { Cost as CostData } from "../../download/api.types";
import { Cost } from "../../sanity/schema-types";
import { migrateProperty } from "../../manage-data";

export default function migrateCost<T>(key: keyof T, value?: CostData): Cost {
  return {
    _type: "cost",
    ...migrateProperty<Cost>("quantity", value.quantity),
    ...migrateProperty<Cost>("unit", value.unit),
  };
}
