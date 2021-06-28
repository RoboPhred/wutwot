import { MaybeArray } from "../types";

export type LDContext = MaybeArray<string | LDContextMap>;
export type LDContextMap = Record<string, string>;
