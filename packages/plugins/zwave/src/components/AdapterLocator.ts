import { Identifier } from "microinject";
import createSymbol from "../create-symbol";

export const AdapterLocator: Identifier<AdapterLocator> = createSymbol(
  "AdapterLocator",
);
export interface AdapterLocator {
  getAdapterPort(): Promise<string | null>;
}
