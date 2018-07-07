import mockConsole from 'jest-mock-console';

const originalConsole = {...console};

describe('setupTestFramework', () => {
  const logMock = (string: string) => string;
  console.log = logMock;
  describe('should reset console between it blocks', () => {
    it('is the first block', () => {
      mockConsole('log');
      console.log('Will not show');
      expect(console.log).toHaveBeenCalledWith('Will not show');
    });
    it('is the second block', () => {
      // Checks if the describe block has been modified
      if(jasmine.getEnv().describe.toString().indexOf('$jestMockConsoleOriginal') !== -1){
        expect(console.log).toBe(logMock);
      } else {
        expect(console.log).not.toBe(logMock);
      }
    });
  });
});