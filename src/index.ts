import { ESLintUtils } from '@typescript-eslint/utils';
import { namedTypes } from 'ast-types';

const message = 'classname is deprecated';

const MESSAGE_ID = 'deprecated-classnames';
export type MessageIds = typeof MESSAGE_ID;

type ClassnamesReplacementRule = {
  name: string;
  replacement: string;
};

const testForDeprecatedClassnames = (string: string, testNames: string[]) => {
  const stringClassnames = string.split(' ');

  return testNames.some((testName) => stringClassnames.includes(testName));
};

const replaceDeprecatedClassnames = (
  string: string,
  replacementRules: ClassnamesReplacementRule[],
) => {
  const stringClassnames = string.split(' ');

  replacementRules.forEach((rule) => {
    const { name, replacement } = rule;

    if (stringClassnames.includes(name)) {
      stringClassnames[stringClassnames.indexOf(name)] = replacement;
    }
  });

  return stringClassnames.join(' ');
};

export type Options = [
  {
    classnames: ClassnamesReplacementRule[];
  }?,
];

const rules = {
  'deprecated-classnames': ESLintUtils.RuleCreator.withoutDocs<
    Options,
    MessageIds
  >({
    meta: {
      type: 'problem',
      fixable: 'code',
      messages: {
        [MESSAGE_ID]: message,
      },
      schema: [
        {
          type: 'object',
          properties: {
            classnames: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                  replacement: {
                    type: 'string',
                  },
                },
                required: ['name', 'replacement'],
                additionalProperties: false,
              },
            },
          },
          required: ['classnames'],
          additionalProperties: false,
        },
      ],
    },
    defaultOptions: [],
    create: function (context) {
      const deprecatedClassnames =
        context.options[0]?.classnames.map((classname) => classname.name) || [];

      return {
        JSXAttribute: function (node) {
          const attributeName = node.name.name;
          const attributeValue = (node.value as namedTypes.Literal)?.value;

          if (typeof attributeValue !== 'string') return;

          if (
            attributeName === 'className' &&
            testForDeprecatedClassnames(attributeValue, deprecatedClassnames)
          ) {
            context.report({
              node,
              messageId: MESSAGE_ID,
              fix: function (fixer) {
                if (node.value === null) return null;

                const fixingRange: [number, number] = [
                  node.value.range[0] + 1,
                  node.value.range[1] - 1,
                ];

                return fixer.replaceTextRange(
                  fixingRange,
                  replaceDeprecatedClassnames(
                    attributeValue,
                    context.options[0]?.classnames || [],
                  ),
                );
              },
            });
          }
        },
      };
    },
  }),
};

export { rules };
