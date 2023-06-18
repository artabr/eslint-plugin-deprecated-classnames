module.exports = {
  '*.js': 'eslint --fix',
  '*.{ts,tsx}': ['eslint --fix', () => 'tsc --noEmit'],
  '*.less': 'stylelint --fix',
};
