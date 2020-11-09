
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  clearMocks: true,
  setupFiles: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '(/tests/.*|\\.(test|spec))\\.(js|jsx|ts|tsx?)$',
};
