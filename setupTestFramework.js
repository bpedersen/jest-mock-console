const {log, warn, error} = {...console};

const originalDescribe = jasmine.getEnv().describe;

jasmine.getEnv().describe = (description, specDefinitions, ...args) => {
  const injectedSpecDefinition = () => {
    afterEach(() => {
      console.log = log;
      console.warn = warn;
      console.error = error;
    });
    specDefinitions();
  };
  return originalDescribe(description, injectedSpecDefinition, ...args);
}
