import { int } from "../../src/coercion";
import * as index from "../../src/index";
import { optional } from "../../src/optional";
import { any, some } from "../../src/repeating";
import { createSlash, slash } from "../../src/slash";

describe("module index", () => {
  it("should provide access to int()", () => {
    expect(index.int).toBe(int);
  });

  it("should provide access to optional()", () => {
    expect(index.optional).toBe(optional);
  });

  it("should provide access to any()", () => {
    expect(index.any).toBe(any);
  });

  it("should provide access to some()", () => {
    expect(index.some).toBe(some);
  });

  it("should provide access to createSlash()", () => {
    expect(index.createSlash).toBe(createSlash);
  });

  it("should provide access to slash()", () => {
    expect(index.slash).toBe(slash);
  });
});
