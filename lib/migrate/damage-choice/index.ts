import { ChoiceData, DamageData } from "../../download/api.types";
import { Choice } from "../choice";
import { Damage } from "../../sanity/schema-types";
import { createKeyedArray } from "../../manage-data";
import { migrateDamageValue } from "../damage";

// eslint-disable-next-line import/prefer-default-export
export function migrateDamageChoiceValue(
  preparedDataMap,
  value: ChoiceData<DamageData>
): Choice<"damageChoice", Damage> {
  return {
    _type: "damageChoice",
    choose: value.choose,
    from: createKeyedArray(
      value.from.map((dam) => migrateDamageValue(preparedDataMap, dam))
    ),
  };
}
