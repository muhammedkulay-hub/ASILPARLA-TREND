import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  react.configs.recommended,
  reactNative.configs.all,
  reactHooks.configs.recommended,
  {
    rules: {
      'react/prop-types': 'off', // Often not needed with TypeScript or if using default props
      'react-native/no-inline-styles': 'off', // Can be too strict
      'react-hooks/exhaustive-deps': 'warn', // Or 'error'
    },
  },
];
