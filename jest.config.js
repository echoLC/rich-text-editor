module.exports = {
  preset: 'jest-puppeteer',
  roots: ['<rootDir>/test'],
  testRegex: 'test/(.+)\\.spec\\.(js?|ts?)$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    URL: 'http://localhost:8088',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}
