import {Param} from '@snout/router-path'

export function int<Name extends string> (name: Name): Param<Name, number> {
  return {
    name,
    exp: /(0|[1-9]\d*)/,
    parse: match => parseInt(match, 10),
    format: arg => `${Math.floor(arg)}`,
  }
}
