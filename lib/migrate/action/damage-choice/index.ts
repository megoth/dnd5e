import { SanityKeyed } from "sanity-codegen";
import {
  ActionData,
  ChoiceData,
  DamageData,
} from "../../../download/api.types";
import { DamageChoice } from "../../../sanity/schema-types";
import { createKeyedArray } from "../../../manage-data";
import migrateDamageChoice from "../../damage-choice";

export default function migrateActionDamageChoice(
  value: ActionData,
  preparedDataMap
): Array<SanityKeyed<DamageChoice>> {
  const damageChoices = (value.damage || []).filter(
    (dam) => "from" in dam
  ) as Array<ChoiceData<DamageData>>;
  return damageChoices.length
    ? createKeyedArray(
        damageChoices.map((dam) => migrateDamageChoice(dam, preparedDataMap))
      )
    : [];
}
