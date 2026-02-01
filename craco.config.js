const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (config) => {
      if (process.env.BUILD_ANALYZE === 'true') {
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
          }),
        );
      }
      return config;
    },
  },
};
