import { migrateData } from "../common";
import { MagicSchoolData } from "../../download/api.types";
import { MagicSchool } from "../../sanity/schema-types";

export default function migrateMagicSchoolData(preparedDataMap) {
  return migrateData<MagicSchoolData, MagicSchool>(
    preparedDataMap,
    (magicSchool) => ({
      _type: "magicSchool",
      name_en_US: magicSchool.name,
      description_en_US: magicSchool.desc,
    })
  );
}
