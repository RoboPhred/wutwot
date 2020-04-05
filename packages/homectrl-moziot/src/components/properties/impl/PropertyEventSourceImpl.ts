import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import { PropertyEventSink } from "../components/PropertyEventSink";
import {
  PropertyEventSource,
  ThingPropertyAddedEventArgs,
  ThingPropertyRemovedEventArgs
} from "../services";

import { ThingProperty } from "../types";

@injectable()
@singleton()
@provides(PropertyEventSource)
@provides(PropertyEventSink)
export class PropertyEventSourceImpl extends EventEmitter
  implements PropertyEventSource, PropertyEventSink {
  onPropertyAdded(property: ThingProperty): void {
    const e: ThingPropertyAddedEventArgs = {
      thingId: property.thingId,
      propertyId: property.id,
      property
    };
    this.emit("property.add", e);
  }

  onPropertyRemoved(property: ThingProperty): void {
    const e: ThingPropertyRemovedEventArgs = {
      thingId: property.thingId,
      propertyId: property.id,
      property
    };
    this.emit("property.remove", e);
  }
}
