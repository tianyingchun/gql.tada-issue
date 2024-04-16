/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/armitjs/armit
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('@armit/eslint-config-bases/patch/modern-module-resolution');

const {
  getDefaultIgnorePatterns,
} = require('@armit/eslint-config-bases/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns()],
  extends: [
    '@armit/eslint-config-bases/typescript',
    '@armit/eslint-config-bases/sonar',
    '@armit/eslint-config-bases/regexp',
    '@armit/eslint-config-bases/vitest',
    '@armit/eslint-config-bases/react',
    '@armit/eslint-config-bases/tailwind',
    '@armit/eslint-config-bases/prettier',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    // '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['src/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['src/**/*.model.ts', '*.config.mts', '*.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
};
