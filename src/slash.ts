import {Param} from '@snout/router-path'

export function createSlash<Name extends string> (name: Name): Param<Name, boolean> {
  return {
    name,
    exp: /(\/)?/,
    build: arg => arg ? '/' : '',
    parse: match => match !== '',
  }
}

export const slash = createSlash('hasSlash')
