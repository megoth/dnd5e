import { SanityKeyedReference } from "sanity-codegen";
import { createKeyedArray } from "../../manage-data";
import { ChoiceData } from "../../download/api.types";
import { getReference } from "../common";

export interface Choice<T, U> {
  _type: T;
  choose: number;
  from: Array<SanityKeyedReference<U>>;
}

export default function migrateChoiceReference<T, U>(
  preparedDataMap,
  type: T,
  choice: ChoiceData
): Choice<T, U> {
  return {
    _type: type,
    choose: choice.choose,
    from: createKeyedArray(
      choice.from.map((option) => getReference(preparedDataMap, option.url))
    ),
  };
}
