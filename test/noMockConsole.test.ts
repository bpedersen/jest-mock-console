describe("not using the jest-mock-console", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
  describe.skip("should skip this test", () => {
    it("should fail if executed", () => {
      throw new Error("This shouldn't be executed");
    });
  });
});
