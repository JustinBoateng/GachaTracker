// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const reactNative = require('eslint-plugin-react-native');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    plugins: {
      'react-native': reactNative,
    },
    rules: {
      // Flags any string rendered directly under a View/Pressable/etc.
      // instead of wrapped in <Text> - the exact "Text strings must be
      // rendered within a <Text> component" runtime error, caught live
      // in the editor instead of on the emulator.
      'react-native/no-raw-text': 'error',
    },
  },
]);
