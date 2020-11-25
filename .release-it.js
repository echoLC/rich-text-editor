module.exports = {
  git: {
    tagName: 'v${version}',
    commitMessage: 'release: v${version}',
    requireCleanWorkingDir: false,
    requireBranch: 'master',
  },
  hooks: {},
  npm: {
    publish: false,
  },
  prompt: {
    ghRelease: false,
    glRelease: false,
    publish: false,
  },
  plugins: {
    './conventional-changelog.js': {
      preset: 'angular',
      infile: 'CHANGELOG.md',
    },
  },
}
