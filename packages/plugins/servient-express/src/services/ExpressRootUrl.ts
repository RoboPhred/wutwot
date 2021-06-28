import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const ExpressRootUrl: Identifier<ExpressRootUrl> = createSymbol(
  "ExpressRootUrl",
);
export type ExpressRootUrl = string;
