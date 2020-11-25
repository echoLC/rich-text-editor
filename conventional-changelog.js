const { EOL } = require('os')
const fs = require('fs')
const { Plugin } = require('release-it')
const conventionalChangelog = require('conventional-changelog')
const concat = require('concat-stream')
const prependFile = require('prepend-file')

class ConventionalChangelog extends Plugin {
  getInitialOptions(options, namespace) {
    options[namespace].tagName = options.git.tagName
    return options[namespace]
  }

  // async getChangelog(latestVersion) {
  //   const { version, previousTag, currentTag } = await this.getConventionalConfig(latestVersion)
  //   this.setContext({ version, previousTag, currentTag })
  //   return this.generateChangelog()
  // }

  async bump(version) {
    this.setContext({ version })
    const { previousTag, currentTag } = await this.getConventionalConfig()
    this.setContext({ previousTag, currentTag })
    return this.generateChangelog()
  }

  getIncrementedVersion({ increment, latestVersion, isPreRelease, preReleaseId }) {
    this.setContext({
      latestVersion,
      isPreRelease,
      increment,
      preReleaseId,
    })
  }

  async getConventionalConfig() {
    const version = this.context.version

    console.log('getIncrementedVersion', version)

    const previousTag = this.config.getContext('latestTag')
    const tagTemplate =
      this.options.tagName || ((previousTag || '').match(/^v/) ? 'v${version}' : '${version}')
    const currentTag = tagTemplate.replace('${version}', version)

    return { previousTag, currentTag }
  }

  getChangelogStream(options = {}) {
    const { version, previousTag, currentTag } = this.getContext()
    console.log(version, previousTag, currentTag)
    return conventionalChangelog(
      Object.assign(options, this.options),
      { version, previousTag, currentTag },
      {
        debug: this.config.isDebug ? this.debug : null,
      }
    )
  }

  generateChangelog(options) {
    return new Promise((resolve, reject) => {
      const resolver = result => resolve(result.toString().trim())
      const changelogStream = this.getChangelogStream(options)
      changelogStream.pipe(concat(resolver))
      changelogStream.on('error', reject)
    })
  }

  async writeChangelog() {
    const { infile } = this.options
    let { changelog } = this.config.getContext()

    let hasInfile = false
    try {
      fs.accessSync(infile)
      hasInfile = true
    } catch (err) {
      this.debug(err)
    }

    if (!hasInfile) {
      changelog = await this.generateChangelog({ releaseCount: 0 })
      this.debug({ changelog })
    }

    await prependFile(infile, changelog + EOL + EOL)

    if (!hasInfile) {
      await this.exec(`git add ${infile}`)
    }
  }

  async beforeRelease() {
    const { infile } = this.options
    const { isDryRun } = this.config

    this.log.exec(`Writing changelog to ${infile}`, isDryRun)

    if (infile && !isDryRun) {
      await this.writeChangelog()
    }
  }
}

module.exports = ConventionalChangelog
