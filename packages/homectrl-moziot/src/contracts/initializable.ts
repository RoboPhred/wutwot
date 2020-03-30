import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

export const Initializable: Identifier<Initializable> = createSymbol(
  "Initializable"
);
export interface Initializable {
  initialize(): void;
}
