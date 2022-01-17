import { AlignmentData } from "../download/api.types";
import { Alignment } from "../sanity/schema-types";
import migrateData from "./common";

export default function migrateAlignmentData(
  existingData: Record<string, any>
) {
  return migrateData<AlignmentData, Alignment>(existingData, (alignment) => ({
    _type: "alignment",
    name_en_US: alignment.name,
    abbreviation_en_US: alignment.abbreviation,
    description_en_US: alignment.desc,
    slug: {
      _type: "slug",
      current: alignment.index.toString(),
    },
  }));
}
