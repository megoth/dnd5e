const { defaults: tsjPreset } = require("ts-jest/presets");
const { tsconfig } = require("./tsconfig.json");

module.exports = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules/", "/__testUtils/"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "<rootDir>/__testUtils/setupSession",
  ],

  transform: {
    ...tsjPreset.transform,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },

  collectCoverage: true,
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/__testUtils/",
    "/src/windowHelpers",
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 95,
      statements: 95,
    },
  },

  globals: {
    "ts-jest": {
      tsconfig: {
        ...tsconfig,
        jsx: "react",
      },
    },
  },
};
