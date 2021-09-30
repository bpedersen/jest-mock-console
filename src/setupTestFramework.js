// Check to see if version before 27 where jasmine is default
if (global.jasmine) {
  const originalDescribe = jasmine.getEnv().describe;

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
  const originalDescribe = describe;

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
