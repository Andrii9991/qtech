module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: "all",
        minSize: 0,
        automaticNameDelimiter: "~",
        enforceSizeThreshold: 10000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
            @import "@/design/typography.scss";
            @import "@/design/colors.scss";
            @import "@/design/default.scss";
          `,
      },
    },
  },
};
