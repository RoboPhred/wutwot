import { Identifier } from "microinject";
import createSymbol from "../../create-symbol";

export const AdapterDiscoverer: Identifier<AdapterDiscoverer> = createSymbol(
  "AdapterDiscoverer"
);
export interface AdapterDiscoverer {
  getAdapterPort(): Promise<string | null>;
}
