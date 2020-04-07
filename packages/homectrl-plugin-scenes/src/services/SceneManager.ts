import { Thing } from "homectrl-moziot";

export interface SceneManager {
  /**
   * Callback to inform the scene manager that a thing has performed
   * a trigger action that may possibly activate a scene.
   *
   * @param triggerThing The thing that activated the trigger.
   * @param triggerKey The key of the specific trigger relative to this thing.
   */
  onSceneTrigger(triggerThing: Thing, triggerKey: string): void;
}
