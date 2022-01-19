import { Item as ItemData } from "../../download/api.types";
import { Item } from "../../sanity/schema-types";
import { getReference, PreparedDocument } from "../common";

export default function migrateItem<T>(
  preparedDataMap: Record<string, PreparedDocument>,
  key: keyof T,
  value?: Array<ItemData>
): {} | Record<keyof T, Item> {
  return value
    ? {
        [key]: value.map(({ item, quantity }) => ({
          _type: "item",
          item: getReference(preparedDataMap, item.url),
          quantity,
        })),
      }
    : {};
}
