import { Cost as CostData } from "../../download/api.types";
import { Cost } from "../../sanity/schema-types";
import { getProperty } from "../../manage-data";

export default function migrateCost<T>(key: keyof T, value?: CostData): Cost {
  return {
    _type: "cost",
    ...getProperty<Cost>("quantity", value.quantity),
    ...getProperty<Cost>("unit", value.unit),
  };
}
