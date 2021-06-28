import { Identifier } from "microinject";

import createSymbol from "../create-symbol";

import { Scene } from "./Scene";
import { PersistedScene } from "../types";

export const SceneFactory: Identifier<SceneFactory> = createSymbol(
  "SceneFactory",
);
export interface SceneFactory {
  createScene(sceneName: string): Scene;
  restoreScene(scenePersistence: PersistedScene): Scene;
}
