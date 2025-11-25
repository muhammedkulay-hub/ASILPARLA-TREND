const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { assetExts, sourceExts }
  } = await getDefaultConfig();

  return {
    transformer: {},
    resolver: {
      assetExts: [...assetExts, 'png', 'jpg'],
      sourceExts: [...sourceExts, 'jsx', 'js', 'json']
    }
  };
})();
