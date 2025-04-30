const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');
const defaultConfig = getDefaultConfig(__dirname);

// Ensure assets like fonts are included properly
const config = {
  resolver: {
    assetExts: [
      ...defaultConfig.resolver.assetExts,
      'ttf',
      'otf',
      'png',
      'jpg',
      'svg',
    ],
    sourceExts: [...defaultConfig.resolver.sourceExts, 'jsx', 'tsx'],
  },
};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, config),
);
