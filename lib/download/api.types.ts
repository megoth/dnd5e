// Based on work in https://raw.githubusercontent.com/fergcb/fivee/main/src/structures.ts

/* Basic Types */

export type ActionReferenceType = "ability" | "magic" | "melee" | "ranged";

export type ActionUsageType =
  | "at will"
  | "per day"
  | "per rest"
  | "recharge after rest"
  | "recharge on roll";

export type ArmorCategory = "Light" | "Medium" | "Heavy" | "Shield";

export type Component = "M" | "S" | "V";

export type CreatureSize =
  | "Fine"
  | "Diminutive"
  | "Tiny"
  | "Small"
  | "Medium"
  | "Large"
  | "Huge"
  | "Gargantuan"
  | "Colossal";

export type CurrencyUnit = "cp" | "sp" | "ep" | "gp" | "pp";

export type DamageType =
  | "acid"
  | "bludgeoning"
  | "bludgeoning, piercing, and slashing damage from nonmagical weapons"
  | "bludgeoning, piercing, and slashing damage from nonmagical weapons that aren't silvered"
  | "bludgeoning, piercing, and slashing from nonmagical attacks not made with silvered weapons"
  | "bludgeoning, piercing, and slashing from nonmagical weapons"
  | "bludgeoning, piercing, and slashing from nonmagical weapons that aren't adamantine"
  | "bludgeoning, piercing, and slashing from nonmagical weapons that aren't silvered"
  | "bludgeoning, piercing, and slashing from nonmagical/nonsilver weapons"
  | "cold"
  | "damage from spells"
  | "fire"
  | "lightning"
  | "necrotic"
  | "non magical bludgeoning, piercing, and slashing (from stoneskin)"
  | "piercing"
  | "piercing and slashing from nonmagical weapons that aren't adamantine"
  | "piercing from magic weapons wielded by good creatures"
  | "poison"
  | "psychic"
  | "radiant"
  | "slashing"
  | "thunder";

export type GearCategory =
  | "Ammunition"
  | "Arcane Focus"
  | "Druidic focus"
  | "Equipment Pack"
  | "Holy Symbol"
  | "Kit"
  | "Standard Gear";

export type LanguageType = "Exotic" | "Standard";

export type ProficiencyType =
  | "Armor"
  | "Artisan's Tools"
  | "Gaming Sets"
  | "Musical Instruments"
  | "Other"
  | "Saving Throws"
  | "Skills"
  | "Vehicles"
  | "Weapons";

export type RangeCategory =
  | "Martial Melee"
  | "Martial Ranged"
  | "Simple Melee"
  | "Simple Ranged";

export type RestType = "long" | "short";

export type SpellAttackType = "melee" | "ranged";

export type SpellComponent = "S" | "V" | "M";

export type SuccessType = "full" | "half" | "none" | "other";

export type ToolCategory =
  | "Artisan's Tools"
  | "Gaming Sets"
  | "Musical Instrument"
  | "Other Tools";

export type VehicleCategory =
  | "Mounts and Other Animals"
  | "Tack, Harness, and Drawn Vehicles"
  | "Waterborne Vehicles";

export type WeaponCategory = "Simple" | "Martial";

export type WeaponRange = "Melee" | "Ranged";

/* Simple Structures */

export interface APIResource {
  index: BaseData["index"];
  name: BaseData["name"];
  url: BaseData["url"];
}

export interface AbilityBonus {
  ability_score: APIResource;
  bonus: number;
}

export interface AbilityPrerequisiteData {
  ability_score: APIResource;
  minimum_score: number;
}

export interface ActionData {
  attack_bonus?: number;
  name: string;
  damage?: Array<DamageData | ChoiceData<DamageData>>;
  desc?: string;
  dc?: DifficultyClassData;
  options?: ChoiceData<ActionReferenceData | Array<ActionReferenceData>>;
  usage?: ActionUsageData;
  attacks?: ActionData[];
  attack_options?: ChoiceData<ActionData>;
}

export interface ActionUsageData {
  type: ActionUsageType;
  times?: number;
  dice?: string;
  min_value?: number;
  rest_types?: RestType[];
}

export interface ActionReferenceData {
  name: ActionData["name"];
  count: number | string;
  notes?: string;
  type: ActionReferenceType;
}

export interface AreaOfEffectData {
  type: "cone" | "cube" | "cylinder" | "line" | "sphere";
  size: number;
}

export interface ArmorClassData {
  base: number;
  dex_bonus: boolean;
  max_bonus: number;
}

export interface BarbarianSpecifics {
  rage_count: number;
  rage_damage_bonus: number;
  brutal_critical_dice: number;
}

export interface BardSpecifics {
  bardic_inspiration_die: number;
  song_of_rest_die: number;
  magical_secrets_max_5: number;
  magical_secrets_max_7: number;
  magical_secrets_max_9: number;
}

export interface BardMagicalSecretsSpecifics {
  additional_magical_secrets_max_lvl: number;
}

export interface ClericSpecifics {
  channel_divinity_charges: number;
  destroy_undead_cr: number;
}

export interface ChoiceData<T = APIResource> {
  choose: number;
  type?: string;
  from: T[];
}

export interface CostData {
  quantity: number;
  unit: CurrencyUnit;
}

export type DamageData =
  | MonsterDamage
  | SpellDamageByCharacterLevel
  | SpellDamageBySlotLevel
  | WeaponDamage;

export interface MonsterDamage {
  damage_dice: string;
  damage_type: APIResource;
  dc: DifficultyClassData;
}

export interface SpellDamageByCharacterLevel {
  damage_type: APIResource;
  damage_at_character_level: Record<string, string>;
}

export interface SpellDamageBySlotLevel {
  damage_type?: APIResource;
  damage_at_slot_level: Record<string, string>;
}

export interface WeaponDamage {
  damage_dice: string;
  damage_type: APIResource;
}

export interface DifficultyClassData {
  dc_type: APIResource;
  dc_value?: number;
  success_type?: SuccessType;
  dc_success?: SuccessType;
  desc?: string;
}

export type TraitSpecificData = DragonkindTrait | Subtrait | SpellTrait;

export interface DragonkindTrait {
  damage_type: APIResource;
  breath_weapon: ActionData;
}

export interface DruidSpecifics {
  wild_shape_max_cr: number;
  wild_shape_swim: boolean;
  wild_shape_fly: boolean;
}

export interface EquipmentStack {
  equipment: APIResource;
  quantity: number;
}

export interface FeaturePrerequisite {
  type: string;
  feature: string;
}

export interface FighterSpecifics {
  action_surges: number;
  indomitable_uses: number;
  extra_attacks: number;
}

export interface Ideals {
  choose: number;
  type: string;
  from: Array<{
    desc: string;
    alignments: APIResource[];
  }>;
}

export interface ExpertiseOption {
  expertise_options: ChoiceData;
}

export interface Feature {
  name: string;
  desc: string[];
}

export interface FeatureOption {
  subfeature_options: ChoiceData;
}

export interface ItemData {
  item: APIResource;
  quantity: number;
}

export interface LevelPrerequisite {
  type: string;
  level: number;
}

export interface MonkSpecifics {
  martial_arts: Record<string, number>;
  ki_points: number;
  unarmored_movement: number;
}

export interface MonsterSpeed {
  burrow?: string;
  climb?: string;
  fly?: string;
  hover?: boolean;
  swim?: string;
  walk?: string;
}

export interface MonsterSpell {
  name: string;
  level: number;
  notes?: string;
  url: string;
  usage?: ActionUsageData;
}

export interface MonsterSpellcasting {
  level?: number;
  ability: APIResource;
  dc?: number;
  modifier?: number;
  components_required: SpellComponent[];
  school?: string;
  slots?: Record<string, number>;
  spells: MonsterSpell[];
}

export interface MultiClassing {
  prerequisites?: AbilityPrerequisiteData[];
  prerequisite_options?: ChoiceData<AbilityPrerequisiteData>;
  proficiencies: APIResource[];
  proficiency_choices?: ChoiceData[];
}

export interface PaladinSpecifics {
  aura_range: number;
}

export interface PersonalityChoice {
  choose: number;
  type: string;
  from: string[];
}

export interface PlayerSpellcasting {
  level: number;
  spellcasting_ability: APIResource;
  info: SpellCastingInfo[];
}

export interface ProficiencyBonus {
  proficiency: APIResource;
  value: number;
}

export interface RangeData {
  normal: number;
  long: number | null;
}

export interface RangerSpecifics {
  favored_enemies: number;
  favored_terrain: number;
}

interface Reaction {
  name: string;
  desc: string;
  dc?: DifficultyClassData;
}

export interface RogueSpecifics {
  sneak_attack: Record<string, number>;
}

export interface Senses {
  blindsight?: string;
  darkvision?: string;
  passive_perception: number;
  tremorsense?: string;
  truesight?: string;
}

export interface SorcerorSpecifics {
  sorcery_points: number;
  metamagic_known: number;
  creating_spell_slots: Array<{
    spell_slot_level: number;
    sorcery_point_cost: number;
  }>;
}

export interface SpecialAbility {
  name: string;
  desc: string;
  damage?: DamageData[];
  dc?: DifficultyClassData;
  spellcasting?: MonsterSpellcasting;
  usage?: ActionUsageData;
  attack_bonus?: number;
}

export interface SpellPrerequisite {
  type: string;
  spell: string;
}

export type SpecificFeature = ExpertiseOption | FeatureOption;

export interface SpellCastingInfo {
  name: string;
  desc: string[];
}

export interface SpellTrait {
  spell_options: ChoiceData;
}

interface StartingEquipmentOptionEquipment {
  equipment: APIResource;
  quantity: number;
  prerequisites?: Array<{
    type: string;
    proficiency: APIResource;
  }>;
}

interface StartingEquipmentOptionEquipmentOption {
  equipment_option: StartingEquipmentChoice;
}

interface StartingEquipmentOptionEquipmentCategory {
  equipment_category: APIResource;
}

export interface StartingEquipmentChoice {
  choose: number;
  type: string;
  from:
    | Array<
        | StartingEquipmentOptionEquipment
        | StartingEquipmentOptionEquipmentOption
        | StartingEquipmentOptionEquipmentCategory
        | Record<
            string,
            | StartingEquipmentOptionEquipment
            | StartingEquipmentOptionEquipmentOption
          >
      >
    | StartingEquipmentOptionEquipmentCategory;
}

export interface SubclassSpell {
  spell: APIResource;
  prerequisites: SubclassSpellPrerequisite[];
}

export interface SubclassSpellPrerequisite extends APIResource {
  type: string;
}

export interface Subtrait {
  subtrait_options: ChoiceData;
}

export interface VehicleSpeedData {
  quantity: number;
  unit: string;
}

export interface WarlockSpecifics {
  invocations_known: number;
  mystic_arcanum_level_6: number;
  mystic_arcanum_level_7: number;
  mystic_arcanum_level_8: number;
  mystic_arcanum_level_9: number;
}

export interface WizardSpecifics {
  arcane_recovery_levels: number;
}

export type ClassSpecifics =
  | BarbarianSpecifics
  | BardSpecifics
  | BardMagicalSecretsSpecifics
  | ClericSpecifics
  | DruidSpecifics
  | FighterSpecifics
  | MonkSpecifics
  | PaladinSpecifics
  | RangerSpecifics
  | RogueSpecifics
  | SorcerorSpecifics
  | WarlockSpecifics
  | WizardSpecifics;

/* Model Structures */

export interface BaseData {
  name: string;
  index: string | number;
  url: string;
}

export interface AbilityScoreData extends BaseData {
  full_name: string;
  desc: string[];
  skills: APIResource[];
}

export interface AlignmentData extends BaseData {
  abbreviation: string;
  desc: string;
}

export interface BackgroundData extends BaseData {
  starting_proficiencies: APIResource[];
  language_options: ChoiceData;
  starting_equipment: EquipmentStack[];
  starting_equipment_options: ChoiceData<StartingEquipmentOptionEquipmentCategory>[];
  feature: Feature;
  personality_traits: PersonalityChoice;
  ideals: Ideals;
  bonds: PersonalityChoice;
  flaws: PersonalityChoice;
}

export interface ClassData extends BaseData {
  hit_die: number;
  proficiencies: APIResource[];
  proficiency_choices: ChoiceData[];
  saving_throws: APIResource[];
  starting_equipment: EquipmentStack[];
  starting_equipment_options: StartingEquipmentChoice[];
  class_levels: string;
  multi_classing: MultiClassing;
  subclasses: APIResource[];
  spellcasting?: PlayerSpellcasting;
  spells?: string;
}

export interface ConditionData extends BaseData {
  desc: string[];
}

export interface DamageTypeData extends BaseData {
  desc: string[];
}

export interface EquipmentCategoryData extends BaseData {
  equipment: APIResource[];
}

export interface EquipmentData extends BaseData {
  equipment_category: APIResource;
  cost: CostData;
  desc?: string[];
  armor_category?: ArmorCategory;
  armor_class?: ArmorClassData;
  str_minimum?: number;
  stealth_disadvantage?: boolean;
  vehicle_category?: VehicleCategory;
  speed?: VehicleSpeedData;
  capacity?: string;
  damage?: DamageData;
  two_handed_damage?: DamageData;
  weapon_category?: WeaponCategory;
  weapon_range?: WeaponRange;
  category_range?: RangeCategory;
  range?: RangeData;
  throw_range?: RangeData;
  properties?: APIResource[];
  special?: string[];
  gear_category?: APIResource;
  contents?: ItemData[];
  tool_category?: ToolCategory;
  quantity?: number;
  weight?: number;
}

export interface FeatData extends BaseData {
  desc: string[];
  prerequisites?: AbilityPrerequisiteData[];
}

export interface FeatureData extends BaseData {
  class: APIResource;
  subclass?: APIResource;
  desc: string[];
  feature_specific?: SpecificFeature;
  level: number;
  parent?: APIResource;
  prerequisites?: Array<
    | AbilityPrerequisiteData
    | FeaturePrerequisite
    | LevelPrerequisite
    | SpellPrerequisite
  >;
  reference?: string;
}

export interface LanguageData extends BaseData {
  desc?: string;
  type: LanguageType;
  typical_speakers: string[];
  script: string;
}

export interface LevelData extends Omit<BaseData, "name"> {
  level: number;
  ability_score_bonuses?: number;
  prof_bonus?: number;
  feature_choices?: APIResource[];
  features: APIResource[];
  subclass_specific?: ClassSpecifics;
  spellcasting?: Record<string, number>;
  class_specific?: ClassSpecifics;
  class: APIResource;
  subclass?: APIResource;
}

export interface MagicItemData extends BaseData {
  desc: string[];
  equipment_category: APIResource;
}

export interface MagicSchoolData extends BaseData {
  desc: string;
}

export interface MonsterData extends BaseData {
  size: CreatureSize;
  type: string;
  subtype: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  forms?: APIResource[];
  speed: MonsterSpeed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: ProficiencyBonus[];
  damage_vulnerabilities: DamageType[];
  damage_resistances: DamageType[];
  damage_immunities: DamageType[];
  condition_immunities: APIResource[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  special_abilities?: SpecialAbility[];
  actions?: ActionData[];
  legendary_actions?: ActionData[];
  xp?: number;
  reactions?: Reaction[];
}

export interface ProficiencyData extends BaseData {
  type: ProficiencyType;
  classes: APIResource[];
  races: APIResource[];
  reference: APIResource;
}

export interface RaceData extends BaseData {
  name: string;
  speed: number;
  ability_bonuses: AbilityBonus[];
  ability_bonus_options?: ChoiceData<AbilityBonus>;
  alignment: string;
  age: string;
  size: CreatureSize;
  size_description: string;
  starting_proficiencies: APIResource[];
  starting_proficiency_options?: ChoiceData;
  languages: APIResource[];
  language_options?: ChoiceData;
  language_desc: string;
  traits: APIResource[];
  subraces: APIResource[];
}

export interface RuleData extends BaseData {
  desc: string;
  subsections: APIResource[];
}

export interface RuleSectionData extends BaseData {
  desc: string;
}

export interface SkillData extends BaseData {
  desc: string[];
  ability_score: APIResource;
}

export interface SpellData extends BaseData {
  desc: string[];
  higher_level?: string[];
  range: string;
  components: Array<Component>;
  material?: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: number;
  heal_at_slot_level?: Record<string, string>;
  attack_type?: SpellAttackType;
  damage?: DamageData;
  dc?: DifficultyClassData;
  area_of_effect?: AreaOfEffectData;
  school: APIResource;
  classes: APIResource[];
  subclasses: APIResource[];
}

export interface StartingEquipmentData extends BaseData {
  class: APIResource;
  starting_equipment: EquipmentStack[];
  starting_equipment_options: ChoiceData[];
}

export interface SubclassData extends BaseData {
  class: APIResource;
  subclass_flavor: string;
  desc: string[];
  subclass_levels: string;
  spells?: SubclassSpell[];
}

export interface SubraceData extends BaseData {
  race: APIResource;
  desc: string;
  ability_bonuses: AbilityBonus[];
  ability_bonus_options?: ChoiceData;
  starting_proficiencies: APIResource[];
  starting_proficiency_options?: ChoiceData;
  languages: APIResource[];
  language_options?: ChoiceData;
  racial_traits: APIResource[];
  racial_trait_options?: ChoiceData;
}

export interface TraitData extends BaseData {
  races: APIResource[];
  subraces: APIResource[];
  desc: string[];
  parent?: APIResource;
  proficiencies: APIResource[];
  proficiency_choices?: ChoiceData;
  trait_specific?: TraitSpecificData;
}

export interface WeaponPropertyData extends BaseData {
  desc: string[];
}
