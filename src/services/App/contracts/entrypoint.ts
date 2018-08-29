import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

export const Entrypoint: Identifier<Entrypoint> = createSymbol(
  "app-entrypoint"
);
export interface Entrypoint {
  start(): void;
}
