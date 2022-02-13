import { ItemData } from "../../download/api.types";
import { Item } from "../../sanity/schema-types";
import { getReference } from "../common";

export default function migrateItem(entry: ItemData, preparedDataMap): Item {
  return {
    _type: "item",
    item: getReference(preparedDataMap, entry.item.url),
    quantity: entry.quantity,
  };
}
