import mockConsole, { RestoreConsole } from "jest-mock-console";

describe("mockConsole", () => {
  console.log = jest.fn(() => {
    throw "Log called";
  });
  console.warn = jest.fn(() => {
    throw "Warn called";
  });
  console.error = jest.fn(() => {
    throw "Error called";
  });

  describe("no arguments", () => {
    it("should prevent original function while mocked", () => {
      const restore = mockConsole();
      console.error("This should not display");
      expect(console.error).toHaveBeenCalledWith("This should not display");
      expect(console.error).not.toThrow();
      restore();
    });
    it("should restore the console as it was before the mock", () => {
      const restore = mockConsole();
      expect(console.error).not.toThrow();
      restore();
      expect(console.error).toThrowError("Error called");
    });
  });
  describe("a string", () => {
    it("should mock only string key", () => {
      const restore = mockConsole("error");
      console.error("This should not display");
      expect(console.error).toHaveBeenCalledWith("This should not display");
      expect(console.error).not.toThrow();
      expect(console.log).toThrowError("Log called");
      restore();
    });
    it("should restore the console as it was before the mock", () => {
      const originalConsole = { ...console };
      const restore = mockConsole("error");
      expect(console).not.toEqual(originalConsole);
      restore();
      expect(console).toEqual(originalConsole);
    });
  });
  describe("an array", () => {
    it("should mock only keys in the array", () => {
      const restore = mockConsole(["error", "warn"]);
      console.error("This should not display");
      console.warn("This also should not display");
      expect(console.error).toHaveBeenCalledWith("This should not display");
      expect(console.warn).toHaveBeenCalledWith("This also should not display");
      expect(console.error).not.toThrow();
      expect(console.warn).not.toThrow();
      expect(console.log).toThrowError("Log called");
      restore();
    });
    it("should restore the console as it was before the mock", () => {
      const originalConsole = { ...console };
      const restore = mockConsole(["error", "warn"]);
      expect(console).not.toEqual(originalConsole);
      restore();
      expect(console).toEqual(originalConsole);
    });
  });
  describe("an object", () => {
    it("should mock console with object passed", () => {
      const restore = mockConsole({
        error: (s: string) => s,
        warn: (s: string) => s,
      });
      expect(console.error("This should not display")).toEqual(
        "This should not display"
      );
      expect(console.warn("This also should not display")).toEqual(
        "This also should not display"
      );
      expect(console.error).not.toThrow();
      expect(console.warn).not.toThrow();
      expect(console.log).toThrowError("Log called");
      restore();
    });
    it("should restore the console as it was before the mock", () => {
      const originalConsole = { ...console };
      const restore = mockConsole({
        error: (s: string) => s,
        warn: (s: string) => s,
      });
      expect(console).not.toEqual(originalConsole);
      restore();
      expect(console).toEqual(originalConsole);
    });
  });
  describe("should work with beforeAll", () => {
    let restore: RestoreConsole;
    beforeAll(() => {
      restore = mockConsole({
        log: (s: string) => s,
        error: (s: string) => s,
        warn: (s: string) => s,
      });
    });
    afterAll(() => {
      restore();
    });
    it("should mock this", () => {
      expect(console.log("This should not display")).toEqual(
        "This should not display"
      );
    });
  });
  describe.skip("should skip this test", () => {
    it("should fail if executed", () => {
      throw new Error("This shouldn't be executed");
    });
  });
});
