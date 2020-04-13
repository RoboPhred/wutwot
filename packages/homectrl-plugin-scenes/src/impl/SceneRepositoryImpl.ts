import { injectable, provides, singleton } from "microinject";
import { EventEmitter } from "events";

import {
  Scene,
  SceneRepository,
  SceneEventSource,
  SceneAddedEventArgs,
  SceneRegistry,
} from "../components";
import { DuplicateIDError } from "homectrl-moziot";

@injectable()
@singleton()
@provides(SceneRepository)
@provides(SceneEventSource)
@provides(SceneRegistry)
export class SceneRepositoryImpl extends EventEmitter
  implements SceneRepository, SceneRegistry {
  private _scenesById = new Map<string, Scene>();

  constructor() {
    super();
  }

  [Symbol.iterator](): IterableIterator<Scene> {
    return this._scenesById.values();
  }

  addScene(scene: Scene): void {
    if (this._scenesById.has(scene.sceneId)) {
      throw new DuplicateIDError(
        `Scene id ${scene.sceneId} is already in the repository.`,
      );
    }

    this._scenesById.set(scene.sceneId, scene);

    const args: SceneAddedEventArgs = {
      scene,
    };
    this.emit("scene.add", args);
  }
}
