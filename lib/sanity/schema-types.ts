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

export type Documents = Alignment;
