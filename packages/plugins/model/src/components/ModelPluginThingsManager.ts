import { Identifier } from "microinject";

import { PluginThingsManager } from "@wutwot/core";

export const ModelPluginThingsManager: Identifier<PluginThingsManager> = Symbol(
  "PluginThingsMangager::model",
);
