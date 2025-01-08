import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AreaOfEffectShapeType,
  ClassShapeType,
  DamageTypeShapeType,
  DiceShapeType,
  MagicSchoolShapeType,
  SpellDamageCharacterLevelShapeType,
  SpellDamageShapeType,
  SpellDamageSlotLevelShapeType,
  SpellShapeType,
  SubclassShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Spell } from "../ldo/dnd5e.typings";
import { type } from "../../public/data/type";
import spells from "../dnd5eapi-data/5e-SRD-Spells.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";

export function classSpells(classApiUrl: string): Array<string> {
  return spells
    .filter(
      (spell) =>
        !!spell.classes.find((classData) => classData.url === classApiUrl),
    )
    .map((spell) => spell.url);
}

export function transformSpell(
  data: components["schemas"]["Spell"],
  ldoDataset = createLdoDataset(),
): Spell {
  const spell = ldoDataset
    .usingType(SpellShapeType)
    .fromSubject(`#${data.index}`);
  spell.type = type("Spell");
  spell.label = data.name;
  spell.description = data.desc;
  spell.higherLevel = data.higher_level;
  spell.spellRange = data.range;
  spell.components = data.components;
  spell.material = data.material;
  spell.areaOfEffect =
    data.area_of_effect &&
    ldoDataset.usingType(AreaOfEffectShapeType).fromJson({
      size: data.area_of_effect.size,
      ofType: data.area_of_effect.type,
    });
  spell.ritual = data.ritual;
  spell.duration = data.duration;
  spell.concentration = data.concentration;
  spell.castingTime = data.casting_time;
  spell.level = data.level;
  spell.attackType = data.attack_type;
  spell.spellDamage =
    data.damage &&
    ldoDataset.usingType(SpellDamageShapeType).fromJson({
      ...(data.damage.damage_type && {
        damageType: ldoDataset
          .usingType(DamageTypeShapeType)
          .fromSubject(apiUrlToSubjectUrl(data.damage.damage_type.url)),
      }),
      ...(data.damage["damage_at_slot_level"] && {
        damageAtSlotLevel: Object.entries(
          data.damage["damage_at_slot_level"],
        ).map(([slot, damageDice]: [string, string]) =>
          ldoDataset.usingType(SpellDamageSlotLevelShapeType).fromJson({
            slot: parseInt(slot, 10),
            damageDice,
          }),
        ),
      }),
      ...(data.damage["damage_at_character_level"] && {
        damageAtCharacterLevel: Object.entries(
          data.damage["damage_at_character_level"],
        ).map(([level, damageDice]: [string, string]) =>
          ldoDataset.usingType(SpellDamageCharacterLevelShapeType).fromJson({
            level: parseInt(level, 10),
            damageDice,
          }),
        ),
      }),
    });
  spell.magicSchool =
    data.school &&
    ldoDataset
      .usingType(MagicSchoolShapeType)
      .fromSubject(apiUrlToSubjectUrl(data.school.url));
  spell.classes =
    data.classes &&
    data.classes.map((classData) =>
      ldoDataset
        .usingType(ClassShapeType)
        .fromSubject(apiUrlToSubjectUrl(classData.url)),
    );
  spell.subclasses =
    data.subclasses &&
    data.subclasses.map((subclass) =>
      ldoDataset
        .usingType(SubclassShapeType)
        .fromSubject(apiUrlToSubjectUrl(subclass.url)),
    );
  return spell;
}

export default async function writeSpells() {
  const turtle = (
    await Promise.all(
      spells.map((spell) =>
        toTurtle(transformSpell(spell as components["schemas"]["Spell"])),
      ),
    )
  ).reduce((memo, spells) => memo.concat(spells));
  writeFileSync(dataPath("spells"), turtle);
}
