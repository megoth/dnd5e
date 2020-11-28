const withSourceMaps = require("@zeit/next-source-maps");

module.exports = withSourceMaps({
  webpack(config) {
    return {
      ...config,
      module: {
        ...config.module,
        rules: config.module.rules.concat([
          {
            test: /\.ttl$/i,
            use: "raw-loader",
          },
        ]),
      },
    };
  },
});
