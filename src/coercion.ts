import {Param} from '@packula/router-path'

export function int<Name extends string> (name: Name): Param<Name, number> {
  return {
    name,
    exp: /(0|[1-9]\d*)/,
    build: arg => `${Math.floor(arg)}`,
    parse: match => parseInt(match, 10),
  }
}
