import { singleton, inject, injectable, provides } from "microinject";
import { PluginThingsManager, ThingActionRequestUpdate } from "@wutwot/core";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";
import { of as observableOf } from "rxjs";

import {
  SceneFactory,
  SceneManagerThing,
  SceneThingsAdapter,
  SceneRepository,
  ScenePluginThingsManager,
} from "../components";
import { SceneThing } from "../types";

interface AddSceneActionPayload {
  sceneName: string;
}

@injectable()
@singleton()
@provides(SceneManagerThing)
export class SceneManagerThingImpl {
  constructor(
    @inject(ScenePluginThingsManager)
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
        title: "Scene Manager",
      })
      .addSemanticType(WutWotTDIRIs.Management);

    thing.addAction({
      pluginLocalId: "add-scene",
      title: "Create New Scene",
      input: {
        type: "object",
        properties: {
          sceneName: {
            title: "Scene Name",
            type: "string",
            minLength: 1,
          },
        },
      },
      output: {
        type: "string",
      } as const,
      onActionInvocationRequested: (
        thingId,
        actionId,
        input: AddSceneActionPayload,
      ) => {
        if (!input.sceneName || input.sceneName === "") {
          return observableOf(ThingActionRequestUpdate.error());
        }

        const { thing } = this._onCreateSceneThing(input.sceneName);
        return observableOf(ThingActionRequestUpdate.completed(thing.id));
      },
    });
  }

  private _onCreateSceneThing(sceneName: string): SceneThing {
    const scene = this._sceneFactory.createScene(sceneName);
    this._sceneRepository.addScene(scene);
    return this._sceneThingsAdapter.getThingForScene(scene);
  }
}
