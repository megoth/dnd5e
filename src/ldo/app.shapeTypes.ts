import { ShapeType } from "@ldo/ldo";
import { appSchema } from "./app.schema";
import { appContext } from "./app.context";
import {
  App,
  FAQ,
  Locale,
  ResourceBundle,
  RulesBundle,
  TranslationsIndex,
  Translation,
} from "./app.typings";

/**
 * =============================================================================
 * LDO ShapeTypes app
 * =============================================================================
 */

/**
 * App ShapeType
 */
export const AppShapeType: ShapeType<App> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#App",
  context: appContext,
};

/**
 * FAQ ShapeType
 */
export const FAQShapeType: ShapeType<FAQ> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#FAQ",
  context: appContext,
};

/**
 * Locale ShapeType
 */
export const LocaleShapeType: ShapeType<Locale> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#Locale",
  context: appContext,
};

/**
 * ResourceBundle ShapeType
 */
export const ResourceBundleShapeType: ShapeType<ResourceBundle> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#ResourceBundle",
  context: appContext,
};

/**
 * RulesBundle ShapeType
 */
export const RulesBundleShapeType: ShapeType<RulesBundle> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#RulesBundle",
  context: appContext,
};

/**
 * TranslationsIndex ShapeType
 */
export const TranslationsIndexShapeType: ShapeType<TranslationsIndex> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#TranslationsIndex",
  context: appContext,
};

/**
 * Translation ShapeType
 */
export const TranslationShapeType: ShapeType<Translation> = {
  schema: appSchema,
  shape: "https://ldo.js.org/shapes/app.shex#Translation",
  context: appContext,
};
