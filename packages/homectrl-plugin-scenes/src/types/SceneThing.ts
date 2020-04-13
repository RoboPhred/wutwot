import { OwnedPluginThing } from "homectrl-moziot";

import { Scene } from "../components";

export interface SceneThing {
  readonly scene: Scene;
  readonly thing: OwnedPluginThing;
}
