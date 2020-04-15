import { Context } from "microinject";
import { v4 as uuidV4 } from "uuid";

import { SceneFactory, Scene, SceneParams } from "../components";
import { PersistedScene } from "../types";

export function sceneFactoryFactory(context: Context): SceneFactory {
  class SceneFactoryImpl implements SceneFactory {
    createScene(): Scene {
      return context.get(Scene, {
        [SceneParams.SceneId]: uuidV4(),
      });
    }

    restoreScene(persisted: PersistedScene): Scene {
      return context.get(Scene, {
        [SceneParams.SceneId]: persisted.sceneId,
        [SceneParams.ScenePersistedData]: persisted,
      });
    }
  }

  return new SceneFactoryImpl();
}
