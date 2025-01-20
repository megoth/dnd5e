import { components } from "../typings/dnd5eapi";
import { createLdoDataset, toTurtle } from "@ldo/ldo";
import {
  AbilityScoreShapeType,
  AreaOfEffectShapeType,
  DamageTypeShapeType,
  DifficultyClassShapeType,
  ProficiencyShapeType,
  RaceShapeType,
  SubraceShapeType,
  TraitShapeType,
  TraitSpecificBreathWeaponDamageShapeType,
  TraitSpecificBreathWeaponShapeType,
  TraitSpecificShapeType,
  TraitSpecificUsageShapeType,
} from "../ldo/dnd5e.shapeTypes";
import traits from "../dnd5eapi-data/5e-SRD-Traits.json";
import { writeFileSync } from "node:fs";
import { apiUrlToSubjectUrl, dataPath } from "../utils/dnd5e";
import { Trait, TraitSpecificBreathWeapon } from "../ldo/dnd5e.typings";
import { transformChoice } from "./choice";
import {
  IDamageAtCharacterLevel,
  transformDamageAtCharacterLevel,
} from "./damage";

interface IBreathWeaponTrait {
  name?: string;
  desc?: string;
  area_of_effect?: components["schemas"]["AreaOfEffect"];
  damage?: {
    damage_at_character_level?: {
      [key: string]: string;
    };
    damage_type?: components["schemas"]["APIReference"];
  };
  dc?: components["schemas"]["DC"];
  /** @description Description of the usage constraints of this action. */
  usage?: {
    times?: number;
    type?: string;
  };
}

function transformSpecificTraitBreathWeapon(
  data: IBreathWeaponTrait,
  ldoDataset = createLdoDataset(),
): TraitSpecificBreathWeapon {
  return ldoDataset.usingType(TraitSpecificBreathWeaponShapeType).fromJson({
    label: data.name,
    description: [data.desc],
    areaOfEffect:
      data.area_of_effect &&
      ldoDataset.usingType(AreaOfEffectShapeType).fromJson({
        areaSize: data.area_of_effect.size,
        ofType: data.area_of_effect.type,
      }),
    breathWeaponDamage:
      data.damage &&
      ldoDataset.usingType(TraitSpecificBreathWeaponDamageShapeType).fromJson({
        ...transformDamageAtCharacterLevel(
          data.damage as IDamageAtCharacterLevel,
          ldoDataset,
        ),
        damageType: ldoDataset
          .usingType(DamageTypeShapeType)
          .fromSubject(apiUrlToSubjectUrl(data.damage.damage_type.url)),
      }),
    difficultyClass:
      data.dc &&
      ldoDataset.usingType(DifficultyClassShapeType).fromJson({
        dcType: ldoDataset
          .usingType(AbilityScoreShapeType)
          .fromSubject(data.dc.dc_type.url),
        value: data.dc.dc_value,
        successType: data.dc.success_type,
      }),
    traitSpecificUsage:
      data.usage &&
      ldoDataset.usingType(TraitSpecificUsageShapeType).fromJson({
        times: data.usage.times,
        ofType: data.usage.type,
      }),
  });
}

export function transformTrait(
  data: components["schemas"]["Trait"],
  ldoDataset = createLdoDataset(),
): Trait {
  const trait = ldoDataset
    .usingType(TraitShapeType)
    .fromSubject(`#${data.index}`);
  trait.type = { "@id": "Trait" };
  trait.label = data.name;
  trait.description = data.desc;
  trait.races = data.races?.map((race) =>
    ldoDataset
      .usingType(RaceShapeType)
      .fromSubject(apiUrlToSubjectUrl(race.url)),
  );
  trait.subraces = data.subraces?.map((subrace) =>
    ldoDataset
      .usingType(SubraceShapeType)
      .fromSubject(apiUrlToSubjectUrl(subrace.url)),
  );
  trait.proficiencies = data.proficiencies?.map((proficiency) =>
    ldoDataset
      .usingType(ProficiencyShapeType)
      .fromSubject(apiUrlToSubjectUrl(proficiency.url)),
  );
  trait.proficiencyChoices =
    data.proficiency_choices &&
    transformChoice(data.proficiency_choices, ldoDataset);
  trait.languageOptions =
    data.language_options && transformChoice(data.language_options, ldoDataset);
  trait.traitSpecific =
    data.trait_specific &&
    ldoDataset.usingType(TraitSpecificShapeType).fromJson({
      ...(data.trait_specific["damage-type"] && {
        damageType: ldoDataset
          .usingType(DamageTypeShapeType)
          .fromSubject(
            apiUrlToSubjectUrl(data.trait_specific["damage-type"].url),
          ),
      }),
      ...(data.trait_specific["spell_options"] && {
        spellOptions: transformChoice(
          data.trait_specific["spell_options"],
          ldoDataset,
        ),
      }),
      ...(data.trait_specific["subtrait_options"] && {
        subtraitOptions: transformChoice(
          data.trait_specific["subtrait_options"],
          ldoDataset,
        ),
      }),
      ...(data.trait_specific["breath-weapon"] && {
        breathWeapon: transformSpecificTraitBreathWeapon(
          data.trait_specific as IBreathWeaponTrait,
          ldoDataset,
        ),
      }),
    });
  return trait;
}

export default async function writeTraits() {
  const turtle = (
    await Promise.all(
      traits.map((trait) =>
        toTurtle(transformTrait(trait as components["schemas"]["Trait"])),
      ),
    )
  ).reduce((memo, traits) => memo.concat(traits));
  writeFileSync(dataPath("traits"), turtle);
}
