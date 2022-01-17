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

export type Documents = AbilityScore | Alignment | DamageType | Skill;
