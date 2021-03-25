import {Param} from '@packula/router-path'
import {escape} from '@packula/regexp'

export function any<Name extends string> (
  name: Name,
  exp: RegExp = /[^/]+/,
  separator: string = '/',
  prefix: string = separator,
): Param<Name, string[], Partial<string[]>> {
  return {
    name,
    exp: new RegExp(`${arrayParamPattern(exp, prefix, separator)}?`),
    build: arg => arg.length > 0 ? `${prefix}${arg.join(separator)}` : '',
    parse: match => match === '' ? [] : match.split(separator),
  }
}

export function some<Name extends string> (
  name: Name,
  exp: RegExp = /[^/]+/,
  separator: string = '/',
  prefix: string = separator,
): Param<Name, string[], SomeParamResult> {
  return {
    name,
    exp: new RegExp(arrayParamPattern(exp, prefix, separator)),
    build: arg => `${prefix}${arg.join(separator)}`,
    parse: match => match.split(separator) as SomeParamResult,
  }
}

type SomeParamResult = { [0]: string } & Partial<string[]>

function arrayParamPattern (exp: RegExp, prefix: string, separator: string): string {
  const segmentExp = `(?:${exp.source})`

  return `(?:${escape(prefix)}(${segmentExp}(?:${escape(separator)}${segmentExp})*))`
}
