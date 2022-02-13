import {
  Action,
  ActionOptions,
  ActionUsage,
  DifficultyClass,
} from "../../sanity/schema-types";
import {
  ActionData,
  ActionReferenceData,
  ActionUsageData,
  ChoiceData,
  DifficultyClassData,
} from "../../download/api.types";
import { createKeyedArray, migrateOptional } from "../../manage-data";
import migrateDifficultyClass from "../difficulty-class";
import migrateActionOptions from "../action-options";
import migrateActionUsage from "../action-usage";
import migrateActionChoice from "../action-choice";
import migrateActionDamage from "./damage";
import migrateActionDamageChoice from "./damage-choice";
import { Choice } from "../choice";

export default function migrateAction(
  value: ActionData,
  preparedDataMap
): Action {
  return {
    _type: "action",
    ...migrateOptional<Action>("attackBonus", value.attack_bonus),
    name_en_US: value.name,
    ...migrateOptional<Action>(
      "damage",
      migrateActionDamage(value, preparedDataMap)
    ),
    ...migrateOptional<Action>(
      "damageChoice",
      migrateActionDamageChoice(value, preparedDataMap)
    ),
    ...migrateOptional<Action>("description_en_US", value.desc),
    ...migrateOptional<Action, DifficultyClassData, DifficultyClass>(
      "dc",
      value.dc,
      (val) => migrateDifficultyClass(val, preparedDataMap)
    ),
    ...migrateOptional<
      Action,
      ChoiceData<ActionReferenceData | Array<ActionReferenceData>>,
      ActionOptions
    >("options", value.options, migrateActionOptions),
    ...migrateOptional<Action, ActionUsageData, ActionUsage>(
      "usage",
      value.usage,
      migrateActionUsage
    ),
    ...migrateOptional<Action>(
      "attacks",
      createKeyedArray(
        value.attacks?.map((attack) => migrateAction(attack, preparedDataMap))
      )
    ),
    ...migrateOptional<
      Action,
      ChoiceData<ActionData>,
      Choice<"actionChoice", Action>
    >("attackOptions", value.attack_options, (val) =>
      migrateActionChoice(val, preparedDataMap)
    ),
  };
}
