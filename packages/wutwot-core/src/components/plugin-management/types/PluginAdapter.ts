/**
 * A PluginAdapter is responsible for managing a single plugin in the WutWot instance.
 */
export interface PluginAdapter {
  /**
   * The ID of the plugin managed by this adapter.
   */
  readonly pluginId: string;

  /**
   * The plugin instance managed by this adapter.
   */
  readonly plugin: object;

  /**
   * Trigger the plugin's initialization code.
   *
   * This should only be called after all PluginAdapters are created.
   */
  initialize(): void;
}
