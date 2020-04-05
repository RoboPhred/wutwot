/**
 * A PluginAdapter is responsible for managing a single plugin in the MozIot instance.
 */
export interface PluginAdapter {
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
