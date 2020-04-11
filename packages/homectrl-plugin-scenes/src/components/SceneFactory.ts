import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { Scene } from "./Scene";

export const SceneFactory: Identifier<SceneFactory> = createSymbol(
  "SceneFactory",
);
export interface SceneFactory {
  createScene(sceneId: number): Scene;
}
