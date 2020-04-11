import { singleton, inject, injectable, provides } from "microinject";
import {
  OwnedPluginThing,
  PluginThingsManager,
  ThingActionRequestUpdate,
} from "homectrl-moziot";
import { of as observableOf } from "rxjs";

import { SceneFactory, Scene } from "../components";
import { SceneManager } from "../services";

interface CreateNewSceneInput {
  sceneName: string;
}

@injectable()
@singleton()
@provides(SceneManager)
export class SceneManagerImpl {
  private _nextSceneId: number = 1;
  private _managerThing: OwnedPluginThing;
  private _scenes: Scene[] = [];

  constructor(
    @inject(PluginThingsManager)
    private _thingsManager: PluginThingsManager,
    @inject(SceneFactory)
    private _sceneFactory: SceneFactory,
  ) {
    this._managerThing = this._thingsManager
      .addThing({
        pluginLocalId: "manager",
        defaultTitle: "Scene Manager",
      })
      // TODO: Add semantic context
      .addSemanticType("Management");

    this._managerThing.addAction({
      pluginLocalId: "add-scene",
      title: "Create New Scene",
      input: {
        type: "object",
        properties: {
          sceneName: { type: "string" },
        },
        required: ["sceneName"],
      } as const,
      output: {
        type: "string",
      } as const,
      onActionInvocationRequested: (
        invocationThingId,
        invocationActionId,
        input: CreateNewSceneInput,
      ) => {
        const thingId = this._onCreateScene(input);
        return observableOf(ThingActionRequestUpdate.completed(thingId));
      },
    });
  }

  private _onCreateScene(input: CreateNewSceneInput): string {
    const sceneId = this._nextSceneId++;
    const scene = this._sceneFactory.createScene(sceneId);
    this._scenes.push(scene);
    return scene.thingId;
  }
}
