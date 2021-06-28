import { SceneTrigger } from "./SceneTrigger";
import { ScenePropertySetting } from "./ScenePropertySetting";

export interface PersistedScene {
  sceneId: string;
  sceneName: string;
  triggers: SceneTrigger[];
  propertySettings: ScenePropertySetting[];
}
