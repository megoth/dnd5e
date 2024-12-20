module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
  ],
  globals: {
    Atomics: "readonly",
    React: "writable",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: ["**/*.test.*"],
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "": "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-unresolved": [
      "error",
      { extensions: ["", ".json", ".ts", ".tsx"] },
    ],
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".mjs", ".ts", ".tsx"],
      },
    },
  },
};
