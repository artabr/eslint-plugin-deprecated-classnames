module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      parser: '@typescript-eslint/parser',
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:prettier/recommended',
        'prettier',
      ],
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'object-shorthand': 'off',
        'import/no-extraneous-dependencies': 'off',
        'func-names': 'off',
      },
    },
  ],
};
