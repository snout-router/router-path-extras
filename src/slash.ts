import { Param } from "@snout/router-path";

export function createSlash<Name extends string>(
  name: Name
): Param<Name, boolean> {
  return {
    name,
    exp: /(\/)?/,
    parse: (match) => match !== "",
    format: (arg) => (arg ? "/" : ""),
  };
}

export const slash = createSlash("hasSlash");
