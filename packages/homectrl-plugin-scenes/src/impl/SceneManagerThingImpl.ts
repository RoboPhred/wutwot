import { singleton, inject, injectable, provides } from "microinject";
import {
  PluginThingsManager,
  ThingActionRequestUpdate,
  Initializable,
} from "homectrl-moziot";
import { of as observableOf } from "rxjs";

import {
  SceneFactory,
  SceneManagerThing,
  SceneThingsAdapter,
  SceneRepository,
} from "../components";
import { SceneThing } from "../types";

@injectable()
@singleton()
@provides(SceneManagerThing)
@provides(Initializable)
export class SceneManagerThingImpl implements Initializable {
  constructor(
    @inject(PluginThingsManager)
    private _thingsManager: PluginThingsManager,
    @inject(SceneFactory)
    private _sceneFactory: SceneFactory,
    @inject(SceneRepository)
    private _sceneRepository: SceneRepository,
    @inject(SceneThingsAdapter)
    private _sceneThingsAdapter: SceneThingsAdapter,
  ) {}

  onInitialize() {
    const thing = this._thingsManager
      .addThing({
        pluginLocalId: "manager",
        defaultTitle: "Scene Manager",
      })
      // TODO: Add semantic context
      .addSemanticType("Management");

    thing.addAction({
      pluginLocalId: "add-scene",
      title: "Create New Scene",
      output: {
        type: "string",
      } as const,
      onActionInvocationRequested: () => {
        const { thing } = this._onCreateSceneThing();
        return observableOf(ThingActionRequestUpdate.completed(thing.id));
      },
    });
  }

  private _onCreateSceneThing(): SceneThing {
    const scene = this._sceneFactory.createScene();
    this._sceneRepository.addScene(scene);
    return this._sceneThingsAdapter.getThingForScene(scene);
  }
}
