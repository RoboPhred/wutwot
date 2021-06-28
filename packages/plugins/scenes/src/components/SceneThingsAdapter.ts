import { Identifier } from "microinject";

import createSymbol from "../create-symbol";
import { SceneThing } from "../types";

import { Scene } from "./Scene";

export const SceneThingsAdapter: Identifier<SceneThingsAdapter> = createSymbol(
  "SceneThingsAdapter",
);
export interface SceneThingsAdapter {
  getThingForScene(scene: Scene): SceneThing;
}
