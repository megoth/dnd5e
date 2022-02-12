import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Ability Score
 *
 *
 */
export interface AbilityScore extends SanityDocument {
  _type: "abilityScore";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Full name (English) — `string`
   *
   *
   */
  fullName_en_US?: string;

  /**
   * Full name (Norwegian) — `string`
   *
   *
   */
  fullName_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Alignment
 *
 *
 */
export interface Alignment extends SanityDocument {
  _type: "alignment";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Abbreviation (English) — `string`
   *
   *
   */
  abbreviation_en_US?: string;

  /**
   * Abbreviation (Norwegian) — `string`
   *
   *
   */
  abbreviation_nb_NO?: string;

  /**
   * Description (English) — `string`
   *
   *
   */
  description_en_US?: string;

  /**
   * Description (Norwegian) — `string`
   *
   *
   */
  description_nb_NO?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Condition
 *
 *
 */
export interface Condition extends SanityDocument {
  _type: "condition";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Damage Type
 *
 *
 */
export interface DamageType extends SanityDocument {
  _type: "damageType";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Equipment
 *
 *
 */
export interface Equipment extends SanityDocument {
  _type: "equipment";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * Armor Category — `string`
   *
   *
   */
  armorCategory?: string;

  /**
   * Armor Class — `armorClass`
   *
   *
   */
  armorClass?: ArmorClass;

  /**
   * Capacity — `string`
   *
   *
   */
  capacity?: string;

  /**
   * Range Category — `string`
   *
   *
   */
  rangeCategory?: string;

  /**
   * Damage — `damage`
   *
   *
   */
  damage?: Damage;

  /**
   * Equipment Category — `reference`
   *
   *
   */
  equipmentCategory?: SanityReference<EquipmentCategory>;

  /**
   * Gear Category — `reference`
   *
   *
   */
  gearCategory?: SanityReference<EquipmentCategory>;

  /**
   * Contents — `array`
   *
   *
   */
  contents?: Array<SanityKeyed<Item>>;

  /**
   * Cost — `cost`
   *
   *
   */
  cost?: Cost;

  /**
   * Quantity — `number`
   *
   *
   */
  quantity?: number;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;

  /**
   * Properties — `array`
   *
   *
   */
  properties?: Array<SanityKeyedReference<WeaponProperty>>;

  /**
   * Range — `range`
   *
   *
   */
  range?: Range;

  /**
   * Special (English) — `markdown`
   *
   *
   */
  special_en_US?: Markdown;

  /**
   * Special (Norwegian) — `markdown`
   *
   *
   */
  special_nb_NO?: Markdown;

  /**
   * Speed — `vehicleSpeed`
   *
   *
   */
  speed?: VehicleSpeed;

  /**
   * Strength Minimum — `number`
   *
   *
   */
  strMinimum?: number;

  /**
   * Stealth disadvantage — `boolean`
   *
   *
   */
  stealthDisadvantage?: boolean;

  /**
   * Throw Range — `range`
   *
   *
   */
  throwRange?: Range;

  /**
   * Tool Category — `string`
   *
   *
   */
  toolCategory?:
    | "Artisan&#39;s Tools"
    | "Gaming Sets"
    | "Musical Instrument"
    | "Other Tools";

  /**
   * Two Handed Damage — `damage`
   *
   *
   */
  twoHandedDamage?: Damage;

  /**
   * Vehicle Category — `string`
   *
   *
   */
  vehicleCategory?:
    | "Mounts and Other Animals"
    | "Tack, Harness, and Drawn Vehicles"
    | "Waterborne Vehicles";

  /**
   * Weapon Range — `string`
   *
   *
   */
  weaponRange?: "Melee" | "Ranged";

  /**
   * Weight — `number`
   *
   *
   */
  weight?: number;
}

/**
 * Equipment Category
 *
 *
 */
export interface EquipmentCategory extends SanityDocument {
  _type: "equipmentCategory";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Feat
 *
 *
 */
export interface Feat extends SanityDocument {
  _type: "feat";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Prerequisites — `array`
   *
   *
   */
  prerequisites?: Array<SanityKeyed<AbilityPrerequisite>>;

  /**
   * Description (English) — `string`
   *
   *
   */
  description_en_US?: string;

  /**
   * Description (Norwegian) — `string`
   *
   *
   */
  description_nb_NO?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Language
 *
 *
 */
export interface Language extends SanityDocument {
  _type: "language";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `string`
   *
   *
   */
  description_en_US?: string;

  /**
   * Description (Norwegian) — `string`
   *
   *
   */
  description_nb_NO?: string;

  /**
   * Type — `string`
   *
   *
   */
  type?: "Standard" | "Exotic";

  /**
   * Typical speakers (English) — `array`
   *
   *
   */
  typicalSpeakers_en_US?: Array<SanityKeyed<string>>;

  /**
   * Typical speakers (Norwegian) — `array`
   *
   *
   */
  typicalSpeakers_nb_NO?: Array<SanityKeyed<string>>;

  /**
   * Script (English) — `string`
   *
   *
   */
  script_en_US?: string;

  /**
   * Script (Norwegian) — `string`
   *
   *
   */
  script_nb_NO?: string;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Magic Item
 *
 *
 */
export interface MagicItem extends SanityDocument {
  _type: "magicItem";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Equipment Category — `reference`
   *
   *
   */
  equipmentCategory?: SanityReference<EquipmentCategory>;

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Magic School
 *
 *
 */
export interface MagicSchool extends SanityDocument {
  _type: "magicSchool";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Proficiency
 *
 *
 */
export interface Proficiency extends SanityDocument {
  _type: "proficiency";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Type — `string`
   *
   *
   */
  type?:
    | "Armor"
    | "Artisans Tools"
    | "Gaming Sets"
    | "Musical Instruments"
    | "Other"
    | "Saving Throws"
    | "Skills"
    | "Vehicles"
    | "Weapons";

  /**
   * Skill Reference — `reference`
   *
   *
   */
  skillReference?: SanityReference<Skill>;

  /**
   * Equipment Reference — `reference`
   *
   *
   */
  equipmentReference?: SanityReference<Equipment>;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Rule
 *
 *
 */
export interface Rule extends SanityDocument {
  _type: "rule";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * Subsections — `array`
   *
   *
   */
  subsections?: Array<SanityKeyedReference<RuleSection>>;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Rule Section
 *
 *
 */
export interface RuleSection extends SanityDocument {
  _type: "ruleSection";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Skill
 *
 *
 */
export interface Skill extends SanityDocument {
  _type: "skill";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * Ability Score — `reference`
   *
   *
   */
  abilityScore?: SanityReference<AbilityScore>;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Spell
 *
 *
 */
export interface Spell extends SanityDocument {
  _type: "spell";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * Higher Level (English) — `markdown`
   *
   *
   */
  higherLevel_en_US?: Markdown;

  /**
   * Higher Level (Norwegian) — `markdown`
   *
   *
   */
  higherLevel_nb_NO?: Markdown;

  /**
   * Range — `string`
   *
   *
   */
  range?: string;

  /**
   * Components — `array`
   *
   *
   */
  components?: Array<SanityKeyed<string>>;

  /**
   * Material — `string`
   *
   *
   */
  material?: string;

  /**
   * Ritual — `boolean`
   *
   *
   */
  ritual?: boolean;

  /**
   * Duration — `string`
   *
   *
   */
  duration?: string;

  /**
   * Concentration — `boolean`
   *
   *
   */
  concentration?: boolean;

  /**
   * Casting Time — `string`
   *
   *
   */
  castingTime?: string;

  /**
   * Level — `number`
   *
   *
   */
  level?: number;

  /**
   * Heal at Slot Level — `array`
   *
   *
   */
  healAtSlotLevel?: Array<SanityKeyed<HealAtSlotLevel>>;

  /**
   * Attack Type — `string`
   *
   *
   */
  attackType?: "melee" | "ranged";

  /**
   * Damage — `damage`
   *
   *
   */
  damage?: Damage;

  /**
   * Difficulty Class — `difficultyClass`
   *
   *
   */
  dc?: DifficultyClass;

  /**
   * Area of Effect — `areaOfEffect`
   *
   *
   */
  areaOfEffect?: AreaOfEffect;

  /**
   * School — `reference`
   *
   *
   */
  school?: SanityReference<MagicSchool>;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Trait
 *
 *
 */
export interface Trait extends SanityDocument {
  _type: "trait";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `string`
   *
   *
   */
  description_en_US?: string;

  /**
   * Description (Norwegian) — `string`
   *
   *
   */
  description_nb_NO?: string;

  /**
   * Parent — `reference`
   *
   *
   */
  parent?: SanityReference<Trait>;

  /**
   * Proficiencies — `array`
   *
   *
   */
  proficiencies?: Array<SanityKeyedReference<Proficiency>>;

  /**
   * Proficiency Choices — `proficiencyChoice`
   *
   *
   */
  proficiencyChoices?: ProficiencyChoice;

  /**
   * Trait Specific — `traitSpecific`
   *
   *
   */
  traitSpecific?: TraitSpecific;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

/**
 * Weapon Property
 *
 *
 */
export interface WeaponProperty extends SanityDocument {
  _type: "weaponProperty";

  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * URL — `url`
   *
   *
   */
  url?: string;
}

export type AbilityPrerequisite = {
  _type: "abilityPrerequisite";
  /**
   * Ability Score — `reference`
   *
   *
   */
  abilityScore?: SanityReference<AbilityScore>;

  /**
   * Minimum Score — `number`
   *
   *
   */
  minimumScore?: number;
};

export type Action = {
  _type: "action";
  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Attack Bonus — `number`
   *
   *
   */
  attackBonus?: number;

  /**
   * Damage — `array`
   *
   *
   */
  damage?: Array<SanityKeyed<Damage>>;

  /**
   * Damage Choice — `array`
   *
   *
   */
  damageChoice?: Array<SanityKeyed<DamageChoice>>;

  /**
   * Description (English) — `markdown`
   *
   *
   */
  description_en_US?: Markdown;

  /**
   * Description (Norwegian) — `markdown`
   *
   *
   */
  description_nb_NO?: Markdown;

  /**
   * Difficulty Class — `difficultyClass`
   *
   *
   */
  dc?: DifficultyClass;

  /**
   * Options — `actionOptions`
   *
   *
   */
  options?: ActionOptions;

  /**
   * Usage — `actionUsage`
   *
   *
   */
  usage?: ActionUsage;

  /**
   * Attacks — `array`
   *
   *
   */
  attacks?: Array<SanityKeyed<Action>>;

  /**
   * Attack Options — `actionChoice`
   *
   *
   */
  attackOptions?: ActionChoice;
};

export type ActionChoice = {
  _type: "actionChoice";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyed<Action>>;
};

export type ActionOption = {
  _type: "actionOption";
  /**
   * Attacks — `array`
   *
   *
   */
  attacks?: Array<SanityKeyed<ActionReference>>;
};

export type ActionOptions = {
  _type: "actionOptions";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyed<ActionOption>>;
};

export type ActionReference = {
  _type: "actionReference";
  /**
   * Name (English) — `string`
   *
   *
   */
  name_en_US?: string;

  /**
   * Name (Norwegian) — `string`
   *
   *
   */
  name_nb_NO?: string;

  /**
   * Count — `string`
   *
   *
   */
  count?: string;

  /**
   * Notes (English) — `string`
   *
   *
   */
  notes_en_US?: string;

  /**
   * Notes (Norwegian) — `string`
   *
   *
   */
  notes_nb_NO?: string;

  /**
   * Type — `string`
   *
   *
   */
  type?: "ability" | "magic" | "melee" | "ranged";
};

export type ActionUsage = {
  _type: "actionUsage";
  /**
   * Type — `string`
   *
   *
   */
  type?:
    | "at will"
    | "per day"
    | "per rest"
    | "recharge after rest"
    | "recharge on roll";

  /**
   * Times — `number`
   *
   *
   */
  times?: number;

  /**
   * Dice — `string`
   *
   *
   */
  dice?: string;

  /**
   * Minimum value — `number`
   *
   *
   */
  minValue?: number;

  /**
   * Rest Type — `string`
   *
   *
   */
  restType?: "long" | "short";
};

export type AreaOfEffect = {
  _type: "areaOfEffect";
  /**
   * Type — `string`
   *
   *
   */
  type?: "cone" | "cube" | "cylinder" | "line" | "sphere";

  /**
   * Size — `number`
   *
   *
   */
  size?: number;
};

export type ArmorClass = {
  _type: "armorClass";
  /**
   * Base — `number`
   *
   *
   */
  base?: number;

  /**
   * Dex Bonus — `boolean`
   *
   *
   */
  dexBonus?: boolean;

  /**
   * Max Bonus — `number`
   *
   *
   */
  maxBonus?: number;
};

export type Cost = {
  _type: "cost";
  /**
   * Quantity — `number`
   *
   *
   */
  quantity?: number;

  /**
   * Unit — `string`
   *
   *
   */
  unit?: "cp" | "sp" | "ep" | "gp" | "pp";
};

export type Damage = {
  _type: "damage";
  /**
   * Damage Dice — `string`
   *
   *
   */
  damageDice?: string;

  /**
   * Damage Type — `reference`
   *
   *
   */
  damageType?: SanityReference<DamageType>;

  /**
   * Difficulty Class — `difficultyClass`
   *
   *
   */
  dc?: DifficultyClass;

  /**
   * Damage at Character Level — `array`
   *
   *
   */
  damageAtCharacterLevel?: Array<SanityKeyed<DamageAtCharacterLevel>>;

  /**
   * Damage at Slot Level — `array`
   *
   *
   */
  damageAtSlotLevel?: Array<SanityKeyed<DamageAtSlotLevel>>;
};

export type DamageAtCharacterLevel = {
  _type: "damageAtCharacterLevel";
  /**
   * Level — `number`
   *
   *
   */
  level?: number;

  /**
   * Damage — `string`
   *
   *
   */
  damage?: string;
};

export type HealAtSlotLevel = {
  _type: "healAtSlotLevel";
  /**
   * Slot — `number`
   *
   *
   */
  slot?: number;

  /**
   * Heal — `string`
   *
   *
   */
  heal?: string;
};

export type DamageChoice = {
  _type: "damageChoice";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyed<Damage>>;
};

export type DifficultyClass = {
  _type: "difficultyClass";
  /**
   * Difficulty Class Type — `reference`
   *
   *
   */
  difficultyClassType?: SanityReference<AbilityScore>;

  /**
   * Difficulty Class Value — `number`
   *
   *
   */
  difficultyClassValue?: number;

  /**
   * Success Type — `string`
   *
   *
   */
  successType?: "full" | "half" | "none" | "other";

  /**
   * Description (English) — `string`
   *
   *
   */
  description_en_US?: string;

  /**
   * Description (Norwegian) — `string`
   *
   *
   */
  description_nb_NO?: string;
};

export type DamageAtSlotLevel = {
  _type: "damageAtSlotLevel";
  /**
   * Slot — `number`
   *
   *
   */
  slot?: number;

  /**
   * Damage — `string`
   *
   *
   */
  damage?: string;
};

export type Item = {
  _type: "item";
  /**
   * Item — `reference`
   *
   *
   */
  item?: SanityReference<Equipment>;

  /**
   * Quantity — `number`
   *
   *
   */
  quantity?: number;
};

export type ProficiencyChoice = {
  _type: "proficiencyChoice";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyedReference<Proficiency>>;
};

export type Range = {
  _type: "range";
  /**
   * Normal — `number`
   *
   *
   */
  normal?: number;

  /**
   * Long — `number`
   *
   *
   */
  long?: number;
};

export type SpellChoice = {
  _type: "spellChoice";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyedReference<Spell>>;
};

export type TraitChoice = {
  _type: "traitChoice";
  /**
   * Choose — `number`
   *
   *
   */
  choose?: number;

  /**
   * From — `array`
   *
   *
   */
  from?: Array<SanityKeyedReference<Trait>>;
};

export type TraitSpecific = {
  _type: "traitSpecific";
  /**
   * Damage Type — `reference`
   *
   *
   */
  damageType?: SanityReference<DamageType>;

  /**
   * Breath Weapon — `action`
   *
   *
   */
  breathWeapon?: Action;

  /**
   * Subtrait Options — `traitChoice`
   *
   *
   */
  subtraitOptions?: TraitChoice;

  /**
   * Spell Options — `spellChoice`
   *
   *
   */
  spellOptions?: SpellChoice;
};

export type VehicleSpeed = {
  _type: "vehicleSpeed";
  /**
   * Quantity — `number`
   *
   *
   */
  quantity?: number;

  /**
   * Unit — `string`
   *
   *
   */
  unit?: string;
};

export type Documents =
  | AbilityScore
  | Alignment
  | Condition
  | DamageType
  | Equipment
  | EquipmentCategory
  | Feat
  | Language
  | MagicItem
  | MagicSchool
  | Proficiency
  | Rule
  | RuleSection
  | Skill
  | Spell
  | Trait
  | WeaponProperty;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Markdown = any;
