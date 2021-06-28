import {
  DataPersistence,
  DataPersistenceKey,
  ScopedDataPersistence,
} from "../../persistence";

export class PluginLocalThingDataPersistence extends ScopedDataPersistence {
  constructor(parent: DataPersistence, private _pluginId: string) {
    super(parent);
  }

  protected get dataKey(): DataPersistenceKey {
    return ["plugins", this._pluginId];
  }
}
