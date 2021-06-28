import { OwnedPluginThing } from "@wutwot/core";

import { Scene } from "../components";

export interface SceneThing {
  readonly scene: Scene;
  readonly thing: OwnedPluginThing;
}
