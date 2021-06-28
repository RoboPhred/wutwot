import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const Shutdownable: Identifier<Shutdownable> = createSymbol(
  "Shutdownable",
);
export interface Shutdownable {
  onShutdown(): void;
}
