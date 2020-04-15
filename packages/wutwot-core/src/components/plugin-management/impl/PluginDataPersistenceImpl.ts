import {
  ScopedDataPersistence,
  DataPersistence,
  DataPersistenceKey,
} from "../../persistence";

export class PluginDataPersistenceImpl extends ScopedDataPersistence {
  constructor(private _pluginId: string, parent: DataPersistence) {
    super(parent);
  }

  protected get dataKey(): DataPersistenceKey {
    return ["plugins", this._pluginId];
  }
}
