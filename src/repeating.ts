import { escape } from "@snout/regexp";
import { Param } from "@snout/router-path";

export function any<Name extends string>(
  name: Name,
  exp = /[^/]+/,
  separator = "/",
  prefix: string = separator,
): Param<Name, string[]> {
  return {
    name,
    exp: new RegExp(`${arrayParamPattern(exp, prefix, separator)}?`),
    parse: (match) => (match === "" ? [] : match.split(separator)),
    format: (arg) => (arg.length > 0 ? `${prefix}${arg.join(separator)}` : ""),
  };
}

export function some<Name extends string>(
  name: Name,
  exp = /[^/]+/,
  separator = "/",
  prefix: string = separator,
): Param<Name, SomeArg> {
  return {
    name,
    exp: new RegExp(arrayParamPattern(exp, prefix, separator)),
    parse: (match) => match.split(separator) as SomeArg,
    format: (arg) => `${prefix}${arg.join(separator)}`,
  };
}

type SomeArg = [string, ...string[]];

function arrayParamPattern(
  exp: RegExp,
  prefix: string,
  separator: string,
): string {
  const segmentExp = `(?:${exp.source})`;

  return `(?:${escape(prefix)}(${segmentExp}(?:${escape(
    separator,
  )}${segmentExp})*))`;
}
