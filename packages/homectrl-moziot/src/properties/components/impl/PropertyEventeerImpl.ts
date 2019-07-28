import { EventEmitter } from "events";
import { injectable, singleton, provides } from "microinject";

import {
  PropertyEventSource,
  ThingPropertyAddedEventArgs,
  ThingPropertyRemovedEventArgs
} from "../../services";

import { PropertyEventSink } from "../PropertyEventSink";
import { ThingProperty } from "../../types";

@injectable()
@singleton()
@provides(PropertyEventSource)
@provides(PropertyEventSink)
export class PropertyEventeerImpl extends EventEmitter
  implements PropertyEventSource, PropertyEventSink {
  onPropertyAdded(
    thingId: string,
    propertyId: string,
    property: ThingProperty
  ): void {
    const e: ThingPropertyAddedEventArgs = {
      thingId,
      propertyId,
      property
    };
    this.emit("property.added", e);
  }

  onPropertyRemoved(thingId: string, propertyId: string): void {
    const e: ThingPropertyRemovedEventArgs = {
      thingId,
      propertyId
    };
    this.emit("property.removed", e);
  }
}
