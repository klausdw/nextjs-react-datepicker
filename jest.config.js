/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testEnvironment: 'node',
  "globals": {
    "ts-jest": {
      tsconfig: './tsconfig.jest.json'
    }
  },
  setupFilesAfterEnv: ['./__test__/jest.setup.ts'],
};