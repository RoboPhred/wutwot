import { Identifier } from "microinject";

import { Scene } from "./Scene";
import createSymbol from "../create-symbol";

export const SceneEventSource: Identifier<SceneEventSource> = createSymbol(
  "SceneEventSource",
);
export interface SceneEventSource {
  on(event: "scene.add", handler: SceneAddedEventHandler): this;
}

export type SceneAddedEventHandler = (e: SceneAddedEventArgs) => void;
export interface SceneAddedEventArgs {
  scene: Scene;
}
