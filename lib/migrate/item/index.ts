import { Item as ItemData } from "../../download/api.types";
import { Item } from "../../sanity/schema-types";
import { getReference, PreparedDocument } from "../common";

function migrateObject(preparedDataMap, entry: ItemData): Item {
  return {
    _type: "item",
    item: getReference(preparedDataMap, entry.item.url),
    quantity: entry.quantity,
  };
}

export default function migrateItem<T>(
  preparedDataMap: Record<string, PreparedDocument>,
  key: keyof T,
  value?: Array<ItemData>
): Record<string, Array<Item>> {
  return value
    ? { [key]: value.map((entry) => migrateObject(preparedDataMap, entry)) }
    : {};
}
