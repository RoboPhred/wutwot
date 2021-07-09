import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { DataPersistence } from "../../persistence";

// Disabled until we can pass this privately to plugins through injection.
// export const PluginDataPersistence: Identifier<DataPersistence> = createSymbol(
//   "PluginDataPersistence",
// );
export type PluginDataPersistence = DataPersistence;
