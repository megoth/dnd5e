import { getReference, migrateData } from "../common";
import { MagicItemData } from "../../download/api.types";
import { MagicItem } from "../../sanity/schema-types";
import { migrateToMarkdown } from "../../manage-data";

export default function migrateMagicItemData(preparedDataMap) {
  return migrateData<MagicItemData, MagicItem>(
    preparedDataMap,
    (magicItem) => ({
      _type: "magicItem",
      name_en_US: magicItem.name,
      equipmentCategory: getReference<MagicItem>(
        preparedDataMap,
        magicItem.equipment_category.url
      ),
      description_en_US: migrateToMarkdown(magicItem.desc),
    })
  );
}
