// Check to see if version before 27 where jasmine is default
if (global.jasmine) {
  const originalDescribe = jasmine.getEnv().describe;

  jasmine.getEnv().describe = (
    description,
    specDefinitions,
    ...describeArgs
  ) => {
    let $jestMockConsoleEachOriginal;
    let $jestMockConsoleAllOriginal;
    const injectedSpecDefinition = (...specArgs) => {
      beforeEach(() => {
        $jestMockConsoleEachOriginal = { ...console };
      });
      afterEach(() => {
        global.console = $jestMockConsoleEachOriginal;
      });
      beforeAll(() => {
        $jestMockConsoleAllOriginal = { ...console };
      });
      afterAll(() => {
        global.console = $jestMockConsoleAllOriginal;
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

  const decorateDescribe = (describeFn) => (description, specDefinitions) => {
    let $jestMockConsoleEachOriginal;
    let $jestMockConsoleAllOriginal;

    const injectedSpecDefinition = (...specArgs) => {
      beforeEach(() => {
        $jestMockConsoleEachOriginal = { ...console };
      });
      afterEach(() => {
        global.console = $jestMockConsoleEachOriginal;
      });
      beforeAll(() => {
        $jestMockConsoleAllOriginal = { ...console };
      });
      afterAll(() => {
        global.console = $jestMockConsoleAllOriginal;
      });
      return specDefinitions(...specArgs);
    };
    return describeFn(description, injectedSpecDefinition);
  };

  global.describe = decorateDescribe(originalDescribe);
  global.describe.skip = decorateDescribe(originalDescribe.skip);
  global.describe.only = decorateDescribe(originalDescribe.only);
  global.describe.each = (table) =>
    decorateDescribe(originalDescribe.each(table));
}
