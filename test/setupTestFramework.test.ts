import mockConsole from "jest-mock-console";

const originalConsole = { ...console };

describe("setupTestFramework", () => {
  const logMock = (string: string) => string;
  console.log = logMock;
  describe("should reset console between it blocks", () => {
    it("is the first block", () => {
      mockConsole("log");
      console.log("Will not show");
      expect(console.log).toHaveBeenCalledWith("Will not show");
    });
    it("is the second block", () => {
      // Checks if the describe block has been modified
      if (global.jasmine) {
        if (
          jasmine
            // @ts-expect-error
            .getEnv()
            .describe.toString()
            .indexOf("$jestMockConsoleEachOriginal") !== -1
        ) {
          expect(console.log).toBe(logMock);
        } else {
          expect(console.log).not.toBe(logMock);
        }
      } else {
        if (
          describe.toString().indexOf("$jestMockConsoleEachOriginal") !== -1
        ) {
          expect(console.log).toBe(logMock);
        } else {
          expect(console.log).not.toBe(logMock);
        }
      }
    });
  });
  describe("should work with beforeAll", () => {
    beforeAll(() => {
      mockConsole();
    });
    it("test 1", () => {
      console.log("Will not show");
      expect(console.log).toHaveBeenCalledWith("Will not show");
    });
    it("test 2", () => {
      console.log("Will not show");
      expect(console.log).toHaveBeenCalledWith("Will not show");
    });
  });
  describe.skip("should skip this test", () => {
    it("should fail if executed", () => {
      throw new Error("This shouldn't be executed");
    });
  });
  describe.each([1, 2])("should work with .each", () => {
    it("test 1", () => {
      mockConsole();
      console.log("Will not show");
      expect(console.log).toHaveBeenCalledWith("Will not show");
    });
  });
});
