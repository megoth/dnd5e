import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AreaOfEffectShapeType,
  ClassShapeType,
  DamageTypeShapeType,
  MagicSchoolShapeType,
  SpellDamageShapeType,
  SpellShapeType,
  SubclassShapeType,
} from "../ldo/dnd5e.shapeTypes";
import { Spell } from "../ldo/dnd5e.typings";
import spells from "../dnd5eapi-data/5e-SRD-Spells.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath, description } from "../utils/dnd5e";
import {
  transformDamageAtCharacterLevel,
  transformDamageAtSlotLevel,
  IDamageAtCharacterLevel,
  IDamageAtSlotLevel,
} from "./damage";

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
  spell.type = { "@id": "Spell" };
  spell.label = data.name;
  spell.description = description(data.desc);
  spell.higherLevel = description(data.higher_level);
  spell.spellRange = data.range;
  spell.components = data.components;
  spell.material = data.material;
  spell.areaOfEffect =
    data.area_of_effect &&
    ldoDataset.usingType(AreaOfEffectShapeType).fromJson({
      areaSize: data.area_of_effect.size,
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
      ...(data.damage["damage_at_slot_level"] &&
        transformDamageAtSlotLevel(data.damage as IDamageAtSlotLevel)),
      ...(data.damage["damage_at_character_level"] &&
        transformDamageAtCharacterLevel(
          data.damage as IDamageAtCharacterLevel,
        )),
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
