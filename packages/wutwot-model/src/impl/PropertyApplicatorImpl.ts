import { inject, injectable } from "microinject";
import {
  Initializable,
  PluginThingsManager,
  ThingEventSource,
} from "@wutwot/core";
import { Subject } from "rxjs";

import { ThingModelPersistence } from "./ThingModelPersistence";

// TODO: This sort if thing is a common use case.  Provide a core implementation of this that auto collects properties to add to every thing.
@injectable()
export class PropertyApplicatorImpl implements Initializable {
  constructor(
    @inject(ThingEventSource) thingEvents: ThingEventSource,
    @inject(PluginThingsManager)
    private _pluginThingsManager: PluginThingsManager,
  ) {
    thingEvents.on("thing.add", (e) => this._attachProps(e.thingId));
  }

  onInitialize(): void {
    for (const thing of this._pluginThingsManager.getThings()) {
      this._attachProps(thing.id);
    }
  }

  private _attachProps(thingId: string) {
    const pluginThing = this._pluginThingsManager.getThing(thingId);
    if (!pluginThing) {
      return;
    }

    const persistence = new ThingModelPersistence(
      pluginThing.getPluginLocalPersistence(),
    );
    const nameSubject = new Subject<string>();
    const locationSubject = new Subject<string>();

    pluginThing.addProperty({
      pluginLocalId: "name",
      type: "string",
      minLength: 0,
      maxLength: 255,
      initialValue: persistence.getName(),
      description: "The name of this device.",
      values: nameSubject,
      onValueChangeRequested: async (
        thingId: string,
        propertyId: string,
        value: string,
      ) => {
        persistence.setName(value);
        nameSubject.next(value);
      },
    });

    pluginThing.addProperty({
      pluginLocalId: "location",
      type: "string",
      minLength: 0,
      maxLength: 255,
      initialValue: persistence.getLocation(),
      description: "The location of this device.",
      values: locationSubject,
      onValueChangeRequested: async (
        thingId: string,
        propertyId: string,
        value: string,
      ) => {
        persistence.setLocation(value);
        locationSubject.next(value);
      },
    });
  }
}
