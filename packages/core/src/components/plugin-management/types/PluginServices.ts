import { DataPersistence } from "../../persistence";

import { PluginThingsManager } from "../services";

/**
 * A collection of plugin specific services.
 */
export interface PluginServices {
  /**
   * A service for creating and retrieving mutable things for this plugin.
   */
  thingsManager: PluginThingsManager;

  /**
   * Persistent data services for this plugin.
   */
  dataPersistence: DataPersistence;
}
