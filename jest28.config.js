module.exports = {
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  moduleNameMapper: {
    "jest-mock-console": "<rootDir>/src",
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
