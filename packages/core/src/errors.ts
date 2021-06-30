export class PluginError extends Error {
  code: string;
  pluginId: string;
  constructor(pluginId: string, message: string) {
    super(message);
    this.pluginId = pluginId;
    this.code = "PLUGIN_ERROR";
    this.message = message;
    Object.setPrototypeOf(this, PluginError.prototype);
  }
}
