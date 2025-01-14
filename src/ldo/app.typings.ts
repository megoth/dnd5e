import { ContextDefinition } from "jsonld";

/**
 * =============================================================================
 * Typescript Typings for app
 * =============================================================================
 */

/**
 * App Type
 */
export interface App {
  "@id"?: string;
  "@context"?: ContextDefinition;
  resourceBundle?: ResourceBundle[];
  supportLanguage?: Locale[];
  rulesBundle?: RulesBundle[];
}

/**
 * FAQ Type
 */
export interface FAQ {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label: string;
  faqLabel: Translation;
  faqDescription: Translation;
}

/**
 * Locale Type
 */
export interface Locale {
  "@id"?: string;
  "@context"?: ContextDefinition;
  language: string;
  languageFlag: string;
}

/**
 * ResourceBundle Type
 */
export interface ResourceBundle {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label: string;
  errorsIndex?: {
    "@id": string;
  }[];
  faqIndex?: {
    "@id": string;
  }[];
  translationBase: {
    "@id": string;
  };
  translationsIndex?: TranslationsIndex[];
}

/**
 * RulesBundle Type
 */
export interface RulesBundle {
  "@id"?: string;
  "@context"?: ContextDefinition;
  label: string;
  rulesResource?: {
    "@id": string;
  }[];
}

/**
 * TranslationsIndex Type
 */
export interface TranslationsIndex {
  "@id"?: string;
  "@context"?: ContextDefinition;
  language?: string;
  translationsResource: {
    "@id": string;
  };
}

/**
 * Translation Type
 */
export interface Translation {
  "@id"?: string;
  "@context"?: ContextDefinition;
  definition: string;
}
