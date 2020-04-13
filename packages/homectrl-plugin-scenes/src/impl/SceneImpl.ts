import {
  EventEventSource,
  OwnedPluginThing,
  PluginThingsManager,
  ThingActionRequestUpdate,
  ThingEventRaisedEventArgs,
  ThingEvent,
  ThingEventRecord,
  MozIot,
} from "homectrl-moziot";
import { injectable, provides, inject, injectParam } from "microinject";
import { Observable, of as observableOf } from "rxjs";
import { isEqual } from "lodash";

import { SceneParams, Scene } from "../components";

interface ScenePropertySetting {
  thingId: string;
  propertyId: string;
  value: any;
}

interface SceneTrigger {
  thingId: string;
  eventId: string;
  data: any;
}

@injectable()
@provides(Scene)
export class SceneImpl implements Scene {
  // TODO: Currently capturing entire payload data and comparing.
  //  Some data might change per-invocation, we need to have a more
  //  robust trigger, possibly by a well-known event.
  private _sceneTriggers: SceneTrigger[] = [];
  private _scenePropertySettings: ScenePropertySetting[] = [];

  constructor(
    @injectParam(SceneParams.SceneId)
    private _sceneId: number,
    @injectParam(SceneParams.SceneThing)
    private _sceneThing: OwnedPluginThing,
    @inject(PluginThingsManager)
    private _thingsManager: PluginThingsManager,
    @inject(EventEventSource)
    private _eventEventSource: EventEventSource,
    @inject(MozIot)
    private _moziot: MozIot,
  ) {
    this._eventEventSource.on("event.raise", this._onEventRaised.bind(this));

    this._sceneThing.addAction({
      pluginLocalId: "learn-trigger",
      title: "Learn Trigger",
      onActionInvocationRequested: (
        invocationThingId,
        invocationActionId,
        input,
      ) => {
        return this._learnTrigger();
      },
    });

    this._sceneThing.addAction({
      pluginLocalId: "add-property-set",
      title: "Add property",
      input: {
        type: "object",
        properties: {
          thingId: { type: "string" },
          propertyId: { type: "string" },
          // TODO: Spec does not allow for any.  Complain to someone about this.
          value: { type: "any" as any },
        },
        required: ["thingId", "propertyId", "value"],
      },
      onActionInvocationRequested: (
        invocationThingId,
        invocationActionId,
        input: ScenePropertySetting,
      ) => {
        this._scenePropertySettings.push(input);
        return observableOf(ThingActionRequestUpdate.completed(null));
      },
    });
  }

  get thingId(): string {
    return this._sceneThing.id;
  }

  private _learnTrigger(): Observable<ThingActionRequestUpdate> {
    return new Observable<ThingActionRequestUpdate>((subscriber) => {
      subscriber.next(ThingActionRequestUpdate.started());
      this._eventEventSource.once("event.raise", ({ event, record }) => {
        this._sceneTriggers.push(makeSceneTrigger(event, record));
        subscriber.next(ThingActionRequestUpdate.completed(null));
      });
    });
  }

  private _onEventRaised(e: ThingEventRaisedEventArgs) {
    const { event, record } = e;
    const trigger = makeSceneTrigger(event, record);
    if (
      this._sceneTriggers.some((sceneTrigger) => isEqual(sceneTrigger, trigger))
    ) {
      this._triggerScene();
    }
  }

  private _triggerScene() {
    for (const propSetting of this._scenePropertySettings) {
      const { thingId, propertyId, value } = propSetting;
      const thing = this._moziot.things.get(thingId);
      if (!thing) {
        continue;
      }
      const prop = thing.properties.get(propertyId);
      if (!prop) {
        continue;
      }

      prop.setValue(value);
    }
  }
}

function makeSceneTrigger(event: ThingEvent, record: ThingEventRecord) {
  return {
    thingId: event.thingId,
    eventId: event.id,
    data: record.data,
  };
}
