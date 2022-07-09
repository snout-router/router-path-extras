import {
  AnyParam,
  normalizeParam,
  NormalizeParam,
  Param,
  ParamArg,
  ParamOrString,
} from "@snout/router-path";
import { escape } from "@snout/regexp";

export function optional<InnerParam extends ParamOrString>(
  literals: TemplateStringsArray,
  inner: InnerParam
): OptionalParam<NormalizeParam<InnerParam>> {
  type T = OptionalParam<NormalizeParam<InnerParam>>;
  type Arg = ParamArg<T>;

  if (literals.length !== 2) throw new Error("Invalid param count");

  const [start, end] = literals as unknown as [string, string];
  const { name, exp, parse, format } = normalizeParam(inner);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    name,
    exp: new RegExp(`(?:${escape(start)}${exp.source}${escape(end)})?`),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    parse: (match) => (match === "" ? undefined : parse(match)),
    format: (arg: Arg) => (arg == null ? "" : `${start}${format(arg)}${end}`),
  } as T;
}

type OptionalParam<InnerParam extends AnyParam> = InnerParam extends Param<
  infer Name,
  infer Arg
>
  ? Param<Name, Arg | undefined>
  : AnyParam;
