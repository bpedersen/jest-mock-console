module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  moduleNameMapper: {
    "jest-mock-console": "<rootDir>/src",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "tsjest26",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testURL: "http://localhost",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
