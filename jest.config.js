module.exports = {
  roots: ['<rootDir>/test'],
  testRegex: 'test/(.+)\\.spec\\.(js?|ts?)$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
}
