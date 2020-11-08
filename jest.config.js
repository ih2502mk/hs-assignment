
module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  clearMocks: true,
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  testRegex: '(/tests/.*|\\.(test|spec))\\.(js|jsx|ts|tsx?)$',
};
