module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    { name: 'beta', prerelease: true },
  ],
  repositoryUrl:
    'https://github.com/artabr/eslint-plugin-deprecated-classnames',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/npm',
      {
        tarballDir: 'dist',
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: ['package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'dist/*.tgz',
            name: 'eslint-plugin-deprecated-classnames-${nextRelease.gitTag}.zip',
            label:
              'eslint-plugin-deprecated-classnames (${nextRelease.gitTag})',
          },
        ],
      },
    ],
  ],
};
