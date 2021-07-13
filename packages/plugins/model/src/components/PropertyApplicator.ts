import { inject, injectable, provides } from "microinject";
import {
  Initializable,
  PluginThing,
  PluginThingsManager,
  ThingEventSource,
} from "@wutwot/core";
import { WutWotTDIRIs } from "@wutwot/wutwot-td";
import { Subject } from "rxjs";

import { ThingModelPersistence } from "./ThingModelPersistence";
import { ModelPluginThingsManager } from "./ModelPluginThingsManager";
import { IsSelfNamedThingMetadata } from "../thing-metadata";

// TODO: This sort if thing is a common use case.  Provide a core implementation of this that auto collects properties to add to every thing.
@injectable()
export class PropertyApplicator {
  private _initialized = false;

  constructor(
    @inject(ThingEventSource) thingEvents: ThingEventSource,
    @inject(ModelPluginThingsManager)
    private _pluginThingsManager: PluginThingsManager,
  ) {
    thingEvents.on("thing.add", (e) => this._attachProps(e.thingId));
  }

  onPostInitialize(): void {
    this._initialized = true;
    for (const thing of this._pluginThingsManager.getThings()) {
      this._attachProps(thing.id);
    }
  }

  private _attachProps(thingId: string) {
    if (!this._initialized) {
      return;
    }

    const pluginThing = this._pluginThingsManager.getThing(thingId);
    if (!pluginThing) {
      return;
    }

    if (!shouldProvideName(pluginThing)) {
      return;
    }

    const persistence = new ThingModelPersistence(
      pluginThing.getPluginLocalPersistence(),
    );
    const nameSubject = new Subject<string>();

    pluginThing.addProperty({
      pluginLocalId: "name",
      title: "Name",
      type: "string",
      semanticType: [WutWotTDIRIs.TitleProperty],
      minLength: 0,
      maxLength: 255,
      initialValue: persistence.getName(),
      description: "The name of this thing.",
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
  }
}

function shouldProvideName(thing: PluginThing) {
  const isSelfNamed = thing.getMetadata(IsSelfNamedThingMetadata);
  if (isSelfNamed) {
    return false;
  }

  const semanticTypes = thing.semanticTypes;

  if (
    semanticTypes.includes(WutWotTDIRIs.User) ||
    semanticTypes.includes(WutWotTDIRIs.Management)
  ) {
    return false;
  }

  return true;
}
