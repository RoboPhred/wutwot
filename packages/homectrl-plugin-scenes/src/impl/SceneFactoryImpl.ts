import { Context } from "microinject";
import { SceneFactory, Scene, SceneParams } from "../components";
import { PluginThingsManager } from "homectrl-moziot";

export function sceneFactoryFactory(context: Context): SceneFactory {
  const thingsManager = context.get(PluginThingsManager);

  class SceneFactoryImpl implements SceneFactory {
    createScene(sceneId: number): Scene {
      const thing = thingsManager
        .addThing({
          pluginLocalId: `scene-${sceneId}`,
          defaultTitle: `Scene ${sceneId}`,
        })
        // TODO: semantic context.
        .addSemanticType("Scene");

      const scene = context.get(Scene, {
        [SceneParams.SceneId]: sceneId,
        [SceneParams.SceneThing]: thing,
      });

      return scene;
    }
  }

  return new SceneFactoryImpl();
}
