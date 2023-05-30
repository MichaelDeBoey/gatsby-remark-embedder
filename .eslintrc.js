module.exports = {
  extends: './node_modules/kcd-scripts/eslint.js',
  rules: {
    'import/no-import-module-exports': [
      'error',
      { exceptions: ['**/src/index.js'] },
    ],
  },
  overrides: [
    {
      files: [
        'src/__tests__/CustomTransformer.js',
        'src/__tests__/plugin.js',
        'src/__tests__/transformers/*.js',
      ],
      rules: {
        'import/default': 'off',
        'jest/prefer-mock-promise-shorthand': 'off',
      },
    },
  ],
};
