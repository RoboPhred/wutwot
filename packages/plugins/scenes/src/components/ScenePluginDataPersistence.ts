// This is here as a hack, as we are currently unable to inject plugin specific services.
// See TODO in core

import { Identifier } from "microinject";
import { PluginDataPersistence } from "@wutwot/core";

export const ScenePluginDataPersistence: Identifier<PluginDataPersistence> =
  Symbol("PluginDataPersistence::scenes");
