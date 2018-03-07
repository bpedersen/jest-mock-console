const originalDescribe = jasmine.getEnv().describe;


jasmine.getEnv().describe = (description, specDefinitions, ...describeArgs) => {
  let $jestMockConsoleOriginal;
  const injectedSpecDefinition = (...specArgs) => {
    beforeEach(() => {
       $jestMockConsoleOriginal = {...console};
    });
    afterEach(() => {
      global.console = $jestMockConsoleOriginal;
    });
    specDefinitions(...specArgs);
  };
  return originalDescribe(description, injectedSpecDefinition, ...describeArgs);
}
