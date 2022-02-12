import { getReference, migrateData } from "../common";
import { SpellData } from "../../download/api.types";
import { Spell } from "../../sanity/schema-types";
import { migrateProperty, migrateToMarkdown } from "../../manage-data";
import migrateHealAtSlotLevel from "../heal-at-slot-level";
import migrateDamage from "../damage";
import migrateDifficultyClass from "../difficulty-class";
import migrateAreaOfEffect from "../area-of-effect";

export default function migrateSpellData(preparedDataMap) {
  return migrateData<SpellData, Spell>(preparedDataMap, (spell) => ({
    _type: "spell",
    name_en_US: spell.name,
    description_en_US: migrateToMarkdown(spell.desc),
    ...migrateProperty<Spell>(
      "higherLevel_en_US",
      migrateToMarkdown(spell.higher_level)
    ),
    range: spell.range,
    components: spell.components,
    ...migrateProperty<Spell>("material", spell.material),
    ritual: spell.ritual,
    duration: spell.duration,
    concentration: spell.concentration,
    castingTime: spell.casting_time,
    ...migrateHealAtSlotLevel<Spell>(
      "healAtSlotLevel",
      spell.heal_at_slot_level
    ),
    ...migrateProperty<Spell>("attackType", spell.attack_type),
    ...migrateDamage<Spell>(preparedDataMap, "damage", spell.damage),
    ...migrateDifficultyClass<Spell>("dc", spell.dc),
    ...migrateAreaOfEffect<Spell>("areaOfEffect", spell.area_of_effect),
    school: getReference(preparedDataMap, spell.school.url),
  }));
}
