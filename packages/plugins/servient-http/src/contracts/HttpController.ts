import type { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const HttpController: Identifier<HttpController> =
  createSymbol("HttpController");
export interface HttpController {}
