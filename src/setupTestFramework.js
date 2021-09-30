const originalDescribe = describe;

// Check to see if version before 27 where jasmine is default
const jestVersion = require("jest/package.json").version;
const [majorVersion] = jestVersion.split(".");
if (majorVersion < 27) {
  jasmine.getEnv().describe = (
    description,
    specDefinitions,
    ...describeArgs
  ) => {
    let $jestMockConsoleOriginal;
    const injectedSpecDefinition = (...specArgs) => {
      beforeEach(() => {
        $jestMockConsoleOriginal = { ...console };
      });
      afterEach(() => {
        global.console = $jestMockConsoleOriginal;
      });
      specDefinitions(...specArgs);
    };
    return originalDescribe(
      description,
      injectedSpecDefinition,
      ...describeArgs
    );
  };
} else {
  describe = (description, specDefinitions) => {
    let $jestMockConsoleOriginal;
    const injectedSpecDefinition = (...specArgs) => {
      beforeEach(() => {
        $jestMockConsoleOriginal = { ...console };
      });
      afterEach(() => {
        global.console = $jestMockConsoleOriginal;
      });
      return specDefinitions(...specArgs);
    };
    return originalDescribe(description, injectedSpecDefinition);
  };
}
