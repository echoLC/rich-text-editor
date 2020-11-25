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
    '@release-it/keep-a-changelog': {
      filename: 'CHANGELOG.md',
    },
  },
}
