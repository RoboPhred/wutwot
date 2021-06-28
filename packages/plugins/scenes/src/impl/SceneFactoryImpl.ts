import { Context } from "microinject";
import { v4 as uuidV4 } from "uuid";

import { SceneFactory, Scene, SceneParams } from "../components";
import { PersistedScene } from "../types";

export function sceneFactoryFactory(context: Context): SceneFactory {
  class SceneFactoryImpl implements SceneFactory {
    createScene(sceneName: string): Scene {
      return context.get(Scene, {
        [SceneParams.SceneId]: uuidV4(),
        [SceneParams.SceneName]: sceneName,
      });
    }

    restoreScene(persisted: PersistedScene): Scene {
      return context.get(Scene, {
        [SceneParams.SceneId]: persisted.sceneId,
        [SceneParams.SceneName]: persisted.sceneName,
        [SceneParams.ScenePersistedData]: persisted,
      });
    }
  }

  return new SceneFactoryImpl();
}
