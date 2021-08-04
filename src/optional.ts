import {AnyParam, NormalizeParam, Param, param, ParamArg, ParamOrString} from '@snout/router-path'
import {escape} from '@snout/regexp'

export function optional<InnerParam extends ParamOrString> (
  literals: TemplateStringsArray,
  inner: InnerParam,
): OptionalParam<NormalizeParam<InnerParam>> {
  type NormalizedParam = NormalizeParam<InnerParam>
  type Arg = ParamArg<OptionalParam<NormalizedParam>>

  if (literals.length !== 2) throw new Error('Invalid param count')

  const [start, end] = literals
  const {build, exp, name, parse} = typeof inner === 'string'
    ? param(inner) as NormalizedParam
    : inner as NormalizedParam

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    name,
    exp: new RegExp(`(?:${escape(start)}${exp.source}${escape(end)})?`),
    build: (arg: Arg) => arg == null ? '' : `${start}${build(arg)}${end}`,
    parse: match => match === '' ? undefined : parse(match),
  } as OptionalParam<NormalizeParam<InnerParam>>
}

type OptionalParam<InnerParam extends AnyParam> = InnerParam extends Param<infer Name, infer Arg, infer Result>
  ? Param<Name, Arg | undefined, Result | undefined>
  : AnyParam
