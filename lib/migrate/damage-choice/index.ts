import { ChoiceData, DamageData } from "../../download/api.types";
import { Choice } from "../choice";
import { Damage } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";
import migrateDamage from "../damage";

export default function migrateDamageChoice(
  value: ChoiceData<DamageData>,
  preparedDataMap
): Choice<"damageChoice", Damage> {
  return {
    _type: "damageChoice",
    choose: value.choose,
    from: createKeyedArray(
      value.from.map((dam) => migrateDamage(dam, preparedDataMap))
    ),
  };
}
