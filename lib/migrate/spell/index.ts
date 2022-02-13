import { SanityKeyed } from "sanity-codegen";
import { getReference, migrateData } from "../common";
import {
  AreaOfEffectData,
  DamageData,
  DifficultyClassData,
  SpellData,
} from "../../download/api.types";
import {
  AreaOfEffect,
  Damage,
  DifficultyClass,
  HealAtSlotLevel,
  Spell,
} from "../../sanity/schema-types";
import { migrateOptional, migrateToMarkdown } from "../../manage-data";
import migrateHealAtSlotLevel from "../heal-at-slot-level";
import migrateDamage from "../damage";
import migrateDifficultyClass from "../difficulty-class";
import migrateAreaOfEffect from "../area-of-effect";

export default function migrateSpellData(preparedDataMap) {
  return migrateData<SpellData, Spell>(preparedDataMap, (spell) => ({
    _type: "spell",
    name_en_US: spell.name,
    description_en_US: migrateToMarkdown(spell.desc),
    ...migrateOptional<Spell>(
      "higherLevel_en_US",
      migrateToMarkdown(spell.higher_level)
    ),
    range: spell.range,
    components: spell.components,
    ...migrateOptional<Spell>("material", spell.material),
    ritual: spell.ritual,
    duration: spell.duration,
    concentration: spell.concentration,
    castingTime: spell.casting_time,
    ...migrateOptional<
      Spell,
      Record<string, string>,
      Array<SanityKeyed<HealAtSlotLevel>>
    >("healAtSlotLevel", spell.heal_at_slot_level, migrateHealAtSlotLevel),
    ...migrateOptional<Spell>("attackType", spell.attack_type),
    ...migrateOptional<Spell, DamageData, Damage>(
      "damage",
      spell.damage,
      (val) => migrateDamage(val, preparedDataMap)
    ),
    ...migrateOptional<Spell, DifficultyClassData, DifficultyClass>(
      "dc",
      spell.dc,
      (val) => migrateDifficultyClass(val, preparedDataMap)
    ),
    ...migrateOptional<Spell, AreaOfEffectData, AreaOfEffect>(
      "areaOfEffect",
      spell.area_of_effect,
      migrateAreaOfEffect
    ),
    school: getReference(preparedDataMap, spell.school.url),
  }));
}
