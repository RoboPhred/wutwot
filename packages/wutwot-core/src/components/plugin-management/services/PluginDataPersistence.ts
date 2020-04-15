import { Identifier } from "microinject";

import createSymbol from "../../../create-symbol";

import { DataPersistence } from "../../persistence";

export const PluginDataPersistence: Identifier<DataPersistence> = createSymbol(
  "PluginDataPersistence",
);
export type PluginDataPersistence = DataPersistence;
