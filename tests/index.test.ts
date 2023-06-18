import { ESLintUtils } from '@typescript-eslint/utils';

import { rules } from '../src';

const ruleTester = new ESLintUtils.RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('deprecated-classnames', rules['deprecated-classnames'], {
  valid: [
    {
      code: `<div className="btn" />`,
      options: [
        { classnames: [{ name: 'deprecated', replacement: 'actual' }] },
      ],
    },
    {
      code: `<div className="btn multiple-deprecated-classes" />`,
      options: [
        {
          classnames: [
            { name: 'deprecated', replacement: 'actual' },
            { name: 'another-deprecated', replacement: 'actual' },
          ],
        },
      ],
    },
    {
      code: `<div className="looks-like-deprecated" />`,
      options: [
        { classnames: [{ name: 'deprecated', replacement: 'actual' }] },
      ],
    },
  ],
  invalid: [
    {
      code: `<div className="deprecated btn" />`,
      options: [
        { classnames: [{ name: 'deprecated', replacement: 'actual' }] },
      ],
      errors: [
        {
          messageId: 'deprecated-classnames',
        },
      ],
      output: `<div className="actual btn" />`,
    },
    {
      code: `<div className="deprecated multiple-deprecated-classes" />`,
      options: [
        {
          classnames: [
            { name: 'deprecated', replacement: 'actual' },
            { name: 'another-deprecated', replacement: 'actual' },
          ],
        },
      ],
      errors: [
        {
          messageId: 'deprecated-classnames',
        },
      ],
      output: `<div className="actual multiple-deprecated-classes" />`,
    },
  ],
});
