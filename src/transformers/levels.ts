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
  classLevel.level = data.level.toString();
  classLevel.abilityScoreBonuses = data.ability_score_bonuses?.toString();
  classLevel.proficiencyBonus = data.prof_bonus?.toString();
  classLevel.features = data.features.map((feature) =>
    ldoDataset
      .usingType(FeatureShapeType)
      .fromSubject(dataUrl("features", feature.index)),
  );
  classLevel.levelSpellcasting =
    data.spellcasting &&
    ldoDataset.usingType(ClassLevelSpellcastingShapeType).fromJson({
      cantripsKnown: data.spellcasting.cantrips_known?.toString(),
      spellsKnown: data.spellcasting.spells_known?.toString(),
      spellSlotsLevel1: data.spellcasting.spell_slots_level_1?.toString(),
      spellSlotsLevel2: data.spellcasting.spell_slots_level_2?.toString(),
      spellSlotsLevel3: data.spellcasting.spell_slots_level_3?.toString(),
      spellSlotsLevel4: data.spellcasting.spell_slots_level_4?.toString(),
      spellSlotsLevel5: data.spellcasting.spell_slots_level_5?.toString(),
      spellSlotsLevel6: data.spellcasting.spell_slots_level_6?.toString(),
      spellSlotsLevel7: data.spellcasting.spell_slots_level_7?.toString(),
      spellSlotsLevel8: data.spellcasting.spell_slots_level_8?.toString(),
      spellSlotsLevel9: data.spellcasting.spell_slots_level_9?.toString(),
    });
  classLevel.classSpecific = ldoDataset
    .usingType(ClassSpecificShapeType)
    .fromJson({
      rageCount: data.class_specific?.["rage_count"]?.toString(),
      rageDamageBonus: data.class_specific?.["rage_damage_bonus"]?.toString(),
      brutalCriticalDice:
        data.class_specific?.["brutal_critical_dice"]?.toString(),
      bardicInspirationDice:
        data.class_specific?.["bardic_inspiration_dice"]?.toString(),
      songOfRestDie: data.class_specific?.["song_of_rest_die"]?.toString(),
      magicalSecretsMax5:
        data.class_specific?.["magical_secrets_max_5"]?.toString(),
      magicalSecretsMax7:
        data.class_specific?.["magical_secrets_max_7"]?.toString(),
      magicalSecretsMax9:
        data.class_specific?.["magical_secrets_max_9"]?.toString(),
      channelDivinityChargers:
        data.class_specific?.["channel_divinity_charges"]?.toString(),
      destroyUndeadCr: data.class_specific?.["destroy_undead_cr"]?.toString(),
      wildShapeMaxCr: data.class_specific?.["wild_shape_max_cr"]?.toString(),
      wildShapeSwim: data.class_specific?.["wild_shape_swim"]?.toString(),
      wildShapeFly: data.class_specific?.["wild_shape_fly"]?.toString(),
      actionSurges: data.class_specific?.["action_surges"]?.toString(),
      indomitableUses: data.class_specific?.["indomitable_uses"]?.toString(),
      extraAttacks: data.class_specific?.["extra_attacks"]?.toString(),
      kiPoints: data.class_specific?.["ki_points"]?.toString(),
      unarmoredMovement:
        data.class_specific?.["unarmored_movement"]?.toString(),
      martialArts:
        data.class_specific?.["martial_arts"] &&
        ldoDataset.usingType(DiceShapeType).fromJson({
          diceCount:
            data.class_specific?.["martial_arts"]?.dice_count.toString(),
          diceValue:
            data.class_specific?.["martial_arts"]?.dice_value.toString(),
        }),
      auraRange: data.class_specific?.["aura_range"]?.toString(),
      favoredEnemies: data.class_specific?.["favored_enemies"]?.toString(),
      favoredTerrain: data.class_specific?.["favored_terrain"]?.toString(),
      sneakAttack:
        data.class_specific?.["sneak_attack"] &&
        ldoDataset.usingType(DiceShapeType).fromJson({
          diceCount:
            data.class_specific?.["sneak_attack"]?.dice_count.toString(),
          diceValue:
            data.class_specific?.["sneak_attack"]?.dice_value.toString(),
        }),
      sorceryPoints: data.class_specific?.["sorcery_points"]?.toString(),
      metamagicKnown: data.class_specific?.["metamagic_known"]?.toString(),
      creatingSpellSlots: data.class_specific?.["creating_spell_slots"]?.map(
        (slot: ClassSpecificCreatingSpellSlots) =>
          ldoDataset
            .usingType(ClassSpecificCreatingSpellSlotsShapeType)
            .fromJson({
              spellSlotLevel: slot["spell_slot_level"].toString(),
              sorceryPointCost: slot["sorcery_point_cost"].toString(),
            }),
      ),
      invocationsKnown: data.class_specific?.["invocations_known"]?.toString(),
      mysticArcanumLevel6:
        data.class_specific?.["mystic_arcanum_level_6"]?.toString(),
      mysticArcanumLevel7:
        data.class_specific?.["mystic_arcanum_level_7"]?.toString(),
      mysticArcanumLevel8:
        data.class_specific?.["mystic_arcanum_level_8"]?.toString(),
      mysticArcanumLevel9:
        data.class_specific?.["mystic_arcanum_level_9"]?.toString(),
      arcaneRecoverLevels:
        data.class_specific?.["arcane_recover_levels"]?.toString(),
    });
  return classLevel;
}

export default async function writeLevels() {
  const turtle = (
    await Promise.all(levels.map((level) => toTurtle(transformLevel(level))))
  ).reduce((memo, levels) => memo.concat(levels));
  writeFileSync(dataPath("class-levels"), turtle);
}
