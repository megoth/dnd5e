import {
  ClassLevel,
  ClassSpecificCreatingSpellSlots,
} from "../ldo/dnd5e.typings";
import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  ClassLevelShapeType,
  ClassLevelSpellcastingShapeType,
  ClassSpecificCreatingSpellSlotsShapeType,
  ClassSpecificShapeType,
  DiceShapeType,
  FeatureShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { type } from "../../public/data/type";
import { writeFileSync } from "node:fs";
import { dataPath, dataUrl } from "../utils/dnd5e";
import levels from "../dnd5eapi-data/5e-SRD-Levels.json";

export function transformLevel(
  data: components["schemas"]["ClassLevel"],
  ldoDataset = createLdoDataset(),
): ClassLevel {
  const classLevel = ldoDataset
    .usingType(ClassLevelShapeType)
    .fromSubject(`#${data.index}`);
  classLevel.type = type("ClassLevel");
  classLevel.level = data.level;
  classLevel.abilityScoreBonuses = data.ability_score_bonuses;
  classLevel.proficiencyBonus = data.prof_bonus;
  classLevel.features = data.features.map((feature) =>
    ldoDataset
      .usingType(FeatureShapeType)
      .fromSubject(dataUrl("features", feature.index)),
  );
  classLevel.levelSpellcasting =
    data.spellcasting &&
    ldoDataset.usingType(ClassLevelSpellcastingShapeType).fromJson({
      cantripsKnown: data.spellcasting.cantrips_known,
      spellsKnown: data.spellcasting.spells_known,
      spellSlotsLevel1: data.spellcasting.spell_slots_level_1,
      spellSlotsLevel2: data.spellcasting.spell_slots_level_2,
      spellSlotsLevel3: data.spellcasting.spell_slots_level_3,
      spellSlotsLevel4: data.spellcasting.spell_slots_level_4,
      spellSlotsLevel5: data.spellcasting.spell_slots_level_5,
      spellSlotsLevel6: data.spellcasting.spell_slots_level_6,
      spellSlotsLevel7: data.spellcasting.spell_slots_level_7,
      spellSlotsLevel8: data.spellcasting.spell_slots_level_8,
      spellSlotsLevel9: data.spellcasting.spell_slots_level_9,
    });
  classLevel.classSpecific = ldoDataset
    .usingType(ClassSpecificShapeType)
    .fromJson({
      rageCount: data.class_specific?.["rage_count"],
      rageDamageBonus: data.class_specific?.["rage_damage_bonus"],
      brutalCriticalDice: data.class_specific?.["brutal_critical_dice"],
      bardicInspirationDice: data.class_specific?.["bardic_inspiration_dice"],
      songOfRestDie: data.class_specific?.["song_of_rest_die"],
      magicalSecretsMax5: data.class_specific?.["magical_secrets_max_5"],
      magicalSecretsMax7: data.class_specific?.["magical_secrets_max_7"],
      magicalSecretsMax9: data.class_specific?.["magical_secrets_max_9"],
      channelDivinityChargers:
        data.class_specific?.["channel_divinity_charges"],
      destroyUndeadCr: data.class_specific?.["destroy_undead_cr"],
      wildShapeMaxCr: data.class_specific?.["wild_shape_max_cr"],
      wildShapeSwim: data.class_specific?.["wild_shape_swim"],
      wildShapeFly: data.class_specific?.["wild_shape_fly"],
      actionSurges: data.class_specific?.["action_surges"],
      indomitableUses: data.class_specific?.["indomitable_uses"],
      extraAttacks: data.class_specific?.["extra_attacks"],
      kiPoints: data.class_specific?.["ki_points"],
      unarmoredMovement: data.class_specific?.["unarmored_movement"],
      martialArts:
        data.class_specific?.["martial_arts"] &&
        ldoDataset.usingType(DiceShapeType).fromJson({
          diceCount: data.class_specific?.["martial_arts"]?.dice_count,
          diceValue: data.class_specific?.["martial_arts"]?.dice_value,
        }),
      auraRange: data.class_specific?.["aura_range"],
      favoredEnemies: data.class_specific?.["favored_enemies"],
      favoredTerrain: data.class_specific?.["favored_terrain"],
      sneakAttack:
        data.class_specific?.["sneak_attack"] &&
        ldoDataset.usingType(DiceShapeType).fromJson({
          diceCount: data.class_specific?.["sneak_attack"]?.dice_count,
          diceValue: data.class_specific?.["sneak_attack"]?.dice_value,
        }),
      sorceryPoints: data.class_specific?.["sorcery_points"],
      metamagicKnown: data.class_specific?.["metamagic_known"],
      creatingSpellSlots: data.class_specific?.["creating_spell_slots"]?.map(
        (slot: ClassSpecificCreatingSpellSlots) =>
          ldoDataset
            .usingType(ClassSpecificCreatingSpellSlotsShapeType)
            .fromJson({
              spellSlotLevel: slot["spell_slot_level"],
              sorceryPointCost: slot["sorcery_point_cost"],
            }),
      ),
      invocationsKnown: data.class_specific?.["invocations_known"],
      mysticArcanumLevel6: data.class_specific?.["mystic_arcanum_level_6"],
      mysticArcanumLevel7: data.class_specific?.["mystic_arcanum_level_7"],
      mysticArcanumLevel8: data.class_specific?.["mystic_arcanum_level_8"],
      mysticArcanumLevel9: data.class_specific?.["mystic_arcanum_level_9"],
      arcaneRecoverLevels: data.class_specific?.["arcane_recover_levels"],
    });
  return classLevel;
}

export default async function writeLevels() {
  const turtle = (
    await Promise.all(levels.map((level) => toTurtle(transformLevel(level))))
  ).reduce((memo, levels) => memo.concat(levels));
  writeFileSync(dataPath("class-levels"), turtle);
}
