import { injectable, inject, singleton, provides } from "microinject";
import { PluginDataPersistence } from "@wutwot/core";
import { values } from "lodash";

import { PersistedScene } from "../types";
import {
  ScenePersistenceManager,
  ScenePluginDataPersistence,
} from "../components";

@injectable()
@singleton()
@provides(ScenePersistenceManager)
export class ScenePersistenceManagerImpl {
  constructor(
    @inject(ScenePluginDataPersistence)
    private _dataPersistence: PluginDataPersistence,
  ) {}

  getPersistedScenes(): PersistedScene[] {
    const scenes = this._dataPersistence.get(["scenes"], {});
    return values(scenes);
  }

  setPersistedScene(persistedScene: PersistedScene): void {
    this._dataPersistence.set(
      ["scenes", persistedScene.sceneId],
      persistedScene,
    );
  }
}
