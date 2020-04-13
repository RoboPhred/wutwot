import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { Scene } from "./Scene";

export const SceneRepository: Identifier<SceneRepository> = createSymbol(
  "SceneRepository",
);
export interface SceneRepository {
  addScene(scene: Scene): void;
}
