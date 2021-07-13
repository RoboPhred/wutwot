import {
  OwnedPluginThing,
  PluginThingsManager,
  ThingActionRequestUpdate,
} from "@wutwot/core";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";
import { Observable, of as observableOf, Subject } from "rxjs";

import { Scene } from "../components";
import { ScenePropertySetting, scenePropertySettingDataSchema } from "../types";
import { SceneThing } from "../types/SceneThing";

export class SceneThingImpl implements SceneThing {
  private _sceneNameSubject = new Subject<string>();
  private _thing: OwnedPluginThing;

  constructor(private _scene: Scene, thingsManager: PluginThingsManager) {
    this._thing = thingsManager.addThing({
      pluginLocalId: `scene-${_scene.sceneId}`,
      title: _scene.sceneName,
      description: "Scene",
      metadata: {
        // Let the model plugin that we provide our own name.
        [Symbol.for(
          "https://github.com/robophred/wutwot#model:IsSelfNamedThing",
        )]: true,
      },
    });

    this._thing.addProperty({
      pluginLocalId: "scene-name",
      title: "Name",
      type: "string",
      semanticType: [WutWotTDIRIs.TitleProperty],
      minLength: 1,
      initialValue: _scene.sceneName,
      values: this._sceneNameSubject,
      onValueChangeRequested: async (value: string) => {
        if (!value || value == "") {
          return;
        }
        _scene.sceneName = value;
        this._sceneNameSubject.next(value);
      },
    });

    this._thing.addAction({
      pluginLocalId: "learn-trigger",
      title: "Learn Trigger",
      onActionInvocationRequested: () => {
        return new Observable((subscriber) => {
          subscriber.next(ThingActionRequestUpdate.started());
          _scene
            .learnTrigger()
            .then(() => subscriber.next(ThingActionRequestUpdate.completed()))
            .catch(() => subscriber.next(ThingActionRequestUpdate.error()));
        });
      },
    });

    this._thing.addAction({
      pluginLocalId: "add-property-setter",
      title: "Add Property Setter",
      input: scenePropertySettingDataSchema,
      onActionInvocationRequested: (
        invocationThingId,
        invocationActionId,
        input: ScenePropertySetting,
      ) => {
        _scene.addSceneProperty(input);
        return observableOf(ThingActionRequestUpdate.completed());
      },
    });

    this._thing.addAction({
      pluginLocalId: "activate-scene",
      title: "Activate Scene",
      onActionInvocationRequested: (
        invocationThingId,
        invocationActionId,
        input: unknown,
      ) => {
        _scene.trigger();
        return observableOf(ThingActionRequestUpdate.completed());
      },
    });
  }

  get scene(): Scene {
    return this._scene;
  }

  get thing(): OwnedPluginThing {
    return this._thing;
  }
}
