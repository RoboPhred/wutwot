import { injectable, singleton, provides } from "microinject";

import { PropertyValueRegistry } from "../PropertyValueRegistry";

@injectable()
@singleton()
@provides(PropertyValueRegistry)
export class PropertyValueRegistryImpl implements PropertyValueRegistry {
  // TODO: Prune thingIds that are removed
  // TODO: Prune properties that are removed
  private _propertyValueMap = new Map<string, Map<string, any>>();

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
