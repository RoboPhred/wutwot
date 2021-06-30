import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const HttpRootUrl: Identifier<HttpRootUrl> = createSymbol("HttpRootUrl");
export type HttpRootUrl = string;
