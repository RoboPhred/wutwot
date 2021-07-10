// This is here as a hack, as we are currently unable to inject plugin specific services.
// See TODO in core

import { Identifier } from "microinject";
import { PluginThingsManager } from "@wutwot/core";

export const ScenePluginThingsManager: Identifier<PluginThingsManager> = Symbol(
  "PluginThingsManager::scenes",
);
