const mockConsole = () => {
  const originalConsole = {...console};
  console.log = jest.fn((string) => {
    return {
      show: () => originalConsole.log(string)
    };
  });
  console.warn = jest.fn((string) => {
    return {
      show: () => originalConsole.warn(string)
    };
  });
  console.error = jest.fn((string) => {
    return {
      show: () => originalConsole.error(string)
    };
  });

  return () => {
    console = originalConsole;
  };
};

export default mockConsole;
