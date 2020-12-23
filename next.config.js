const withSourceMaps = require("@zeit/next-source-maps");
const path = require("path");

module.exports = withSourceMaps({
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
});
