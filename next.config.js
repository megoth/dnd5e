const withPWA = require("next-pwa");
const withSourceMaps = require("@zeit/next-source-maps");
const path = require("path");

module.exports = withPWA(
  withSourceMaps({
    pwa: {
      disable: process.env.NODE_ENV === "development",
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
    sassOptions: {
      includePaths: [path.join(__dirname, "styles")],
    },
  })
);
