module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  setupFiles: ['<rootDir>/test/setup-env.js'],
  testMatch: ['**/?(*.)+(test).[jt]s?(x)'],
  clearMocks: true,
}
