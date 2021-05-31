import { Identifier } from "microinject";

import createSymbol from "../create-symbol";
import { ScenePropertySetting } from "../types";

export namespace SceneParams {
  export const SceneId = "scene.id";
  export const SceneName = "scene.name";
  export const ScenePersistedData = "scene.persisted";
}
export const Scene: Identifier<Scene> = createSymbol("Scene");
export interface Scene {
  readonly sceneId: string;

  sceneName: string;

  trigger(): void;

  learnTrigger(): Promise<void>;

  addSceneProperty(property: ScenePropertySetting): void;
}
