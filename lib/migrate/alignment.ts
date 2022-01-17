import { AlignmentData } from "../download/api.types";
import { Alignment } from "../sanity/schema-types";
import { migrateData } from "./common";

export default function migrateAlignmentData(existingDataMap) {
  return migrateData<AlignmentData, Alignment>(
    existingDataMap,
    (alignment) => ({
      _type: "alignment",
      name_en_US: alignment.name,
      abbreviation_en_US: alignment.abbreviation,
      description_en_US: alignment.desc,
    })
  );
}
