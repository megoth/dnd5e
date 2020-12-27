const withPWA = require("next-pwa");
const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withPWA(
  withSourceMaps({
    pwa: {
      disable: process.env.NODE_ENV !== "production",
      dest: "public",
    },
    webpack(config) {
      return {
        ...config,
        module: {
          ...config.module,
          rules: config.module.rules.concat([
            {
              test: /\.(md|ttl)$/i,
              use: "raw-loader",
            },
          ]),
        },
      };
    },
  })
);
