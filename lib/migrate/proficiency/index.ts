import { getReference, migrateData } from "../common";
import { ProficiencyData } from "../../download/api.types";
import { Equipment, Proficiency, Skill } from "../../sanity/schema-types";
import { getSafeType } from "../../manage-data";

export default function migrateProficiencyData(preparedDataMap) {
  return migrateData<ProficiencyData, Proficiency>(
    preparedDataMap,
    (proficiency) => ({
      _type: "proficiency",
      name_en_US: proficiency.name,
      type: getSafeType(proficiency.type) as Proficiency["type"],
      ...(proficiency.type === "Skills"
        ? {
            skillReference: getReference<Skill>(
              preparedDataMap,
              proficiency.reference.url
            ),
          }
        : {
            equipmentReference: getReference<Equipment>(
              preparedDataMap,
              proficiency.reference.url
            ),
          }),
    })
  );
}
