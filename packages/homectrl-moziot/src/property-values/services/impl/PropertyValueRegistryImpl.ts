import { injectable, singleton, provides, inject } from "microinject";

import { ThingEventSource } from "../../../things";
import { PropertyEventSource } from "../../../properties";

import { PropertyValueRegistry } from "../PropertyValueRegistry";

@injectable()
@singleton()
@provides(PropertyValueRegistry)
export class PropertyValueRegistryImpl implements PropertyValueRegistry {
  private _propertyValueMap = new Map<string, Map<string, any>>();

  constructor(
    @inject(ThingEventSource) thingEventSource: ThingEventSource,
    @inject(PropertyEventSource) propertyEventSource: PropertyEventSource
  ) {
    thingEventSource.on("thing.remove", ({ thingId }) => {
      this._propertyValueMap.delete(thingId);
    });
    propertyEventSource.on("property.remove", ({ thingId, propertyId }) => {
      const properties = this._propertyValueMap.get(thingId);
      if (!properties) {
        return;
      }
      properties.delete(propertyId);
    });
  }

  getValue(thingId: string, propertyId: string) {
    const thingProperties = this._propertyValueMap.get(thingId);
    if (!thingProperties) {
      return undefined;
    }

    return thingProperties.get(propertyId);
  }

  setValue(thingId: string, propertyId: string, value: any): void {
    let thingProperties = this._propertyValueMap.get(thingId);
    if (!thingProperties) {
      thingProperties = new Map<string, any>();
      this._propertyValueMap.set(thingId, thingProperties);
    }
    thingProperties.set(propertyId, value);
  }
}
