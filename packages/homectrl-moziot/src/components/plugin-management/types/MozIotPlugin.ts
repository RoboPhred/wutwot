import { MozIotPluginContext } from "./MozIotPluginContext";

export interface MozIotPlugin {
  readonly id: string;

  onRegisterPlugin(plugin: MozIotPluginContext): void;
}
