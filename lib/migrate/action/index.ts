import { SanityKeyed } from "sanity-codegen";
import { Action, Damage, DamageChoice } from "../../sanity/schema-types";
import { ActionData, ChoiceData, DamageData } from "../../download/api.types";
import { migrateDamageValue } from "../damage";
import { createKeyedArray, migrateProperty } from "../../manage-data";
import { migrateDamageChoiceValue } from "../damage-choice";
import migrateDifficultyClass from "../difficulty-class";
import migrateActionOptions from "../action-options";
import migrateActionUsage from "../action-usage";
import migrateActionChoice from "../action-choice";

export function migrateActionDamage(
  preparedDataMap,
  value: ActionData
): Record<string, Array<SanityKeyed<Damage>>> {
  const damages = (value.damage || []).filter(
    (dam) => "damage_type" in dam || "damage_at_slot_level" in dam
  ) as Array<DamageData>;
  return damages.length
    ? {
        damage: createKeyedArray(
          damages.map((dam) => migrateDamageValue(preparedDataMap, dam))
        ),
      }
    : {};
}

export function migrateActionDamageChoice(
  preparedDataMap,
  value: ActionData
): Record<string, Array<SanityKeyed<DamageChoice>>> {
  const damageChoices = (value.damage || []).filter(
    (dam) => "from" in dam
  ) as Array<ChoiceData<DamageData>>;
  return damageChoices.length
    ? {
        damageChoice: createKeyedArray(
          damageChoices.map((dam) =>
            migrateDamageChoiceValue(preparedDataMap, dam)
          )
        ),
      }
    : {};
}

export function migrateActionValue(preparedDataMap, value: ActionData): Action {
  return {
    _type: "action",
    ...migrateProperty<Action>("attackBonus", value.attack_bonus),
    name_en_US: value.name,
    ...migrateActionDamage(preparedDataMap, value),
    ...migrateActionDamageChoice(preparedDataMap, value),
    ...migrateProperty<Action>("description_en_US", value.desc),
    ...migrateDifficultyClass<Action>("dc", value.dc),
    ...migrateActionOptions<Action>("options", value.options),
    ...migrateActionUsage<Action>("usage", value.usage),
    ...migrateProperty<Action>(
      "attacks",
      createKeyedArray(
        value.attacks?.map((attack) =>
          migrateActionValue(preparedDataMap, attack)
        )
      )
    ),
    ...migrateActionChoice<Action>(
      preparedDataMap,
      "attackOptions",
      value.attack_options
    ),
  };
}
