import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const Entrypoint: Identifier<Entrypoint> = createSymbol("Entrypoint");
export interface Entrypoint {
  start(): void;
}
