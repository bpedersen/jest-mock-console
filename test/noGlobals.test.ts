import { describe, jest, it, expect } from "@jest/globals";
import mockConsole, { RestoreConsole } from "jest-mock-console";

describe("This is a describe", () => {
  // @ts-ignore
  const restore = mockConsole(undefined, jest);
  it("should not show a console", () => {
    console.log("This should not display");
    expect(console.log).toHaveBeenLastCalledWith("This should not display");
    restore();
    console.log("This should show");
  });
});
