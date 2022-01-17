import { SanityCodegenConfig } from "sanity-codegen";

const config: SanityCodegenConfig = {
  schemaPath: "./studio/schemas/schema.ts",
  outputPath: "./lib/sanity/schema-types.ts",
};

export default config;
