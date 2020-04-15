import { injectable, singleton, inject, provides } from "microinject";
import { PluginThingsManager, Initializable } from "@wutwot/core";

import {
  SceneEventSource,
  SceneAddedEventArgs,
  SceneThingsAdapter,
  SceneRegistry,
  Scene,
} from "../components";
import { SceneThing } from "../types/SceneThing";
import { SceneThingImpl } from "./SceneThingImpl";

@injectable()
@singleton()
@provides(SceneThingsAdapter)
@provides(Initializable)
export class SceneThingsAdapterImpl
  implements SceneThingsAdapter, Initializable {
  private _sceneThingsBySceneId = new Map<string, SceneThing>();

  constructor(
    @inject(PluginThingsManager)
    private _pluginThingsManager: PluginThingsManager,
    @inject(SceneRegistry)
    private _sceneRegistry: SceneRegistry,
    @inject(SceneEventSource)
    sceneEventSource: SceneEventSource,
  ) {
    sceneEventSource.on("scene.add", this._handleSceneAdded.bind(this));
  }

  getThingForScene(scene: Scene): SceneThing {
    let sceneThing = this._sceneThingsBySceneId.get(scene.sceneId);
    if (!sceneThing) {
      sceneThing = this._createSceneThing(scene);
    }
    return sceneThing;
  }

  onInitialize() {
    for (const scene of this._sceneRegistry) {
      this._createSceneThing(scene);
    }
  }

  private _handleSceneAdded(e: SceneAddedEventArgs) {
    const { scene } = e;
    if (!this._sceneThingsBySceneId.has(scene.sceneId)) {
      this._createSceneThing(scene);
    }
  }

  private _createSceneThing(scene: Scene): SceneThing {
    const thing = this._pluginThingsManager.addThing({
      pluginLocalId: `scene-${scene.sceneId}`,
      defaultTitle: "New Scene",
    });

    const sceneThing = new SceneThingImpl(scene, thing);
    this._sceneThingsBySceneId.set(scene.sceneId, sceneThing);
    return sceneThing;
  }
}
