import { injectable, singleton, provides, inject } from "microinject";

import { IdMapper } from "../../../utils";

import { ThingPropertyDef, ThingProperty } from "../../types";

import { PropertyFactory } from "../PropertyFactory";
import { ThingPropertyImpl } from "./ThingPropertyImpl";
import { PropertyValueRegistry } from "../../../property-values";

@injectable()
@singleton()
@provides(PropertyFactory)
export class PropertyFactoryImpl implements PropertyFactory {
  private _thingPropertyIdMappers = new Map<string, IdMapper>();

  constructor(
    @inject(PropertyValueRegistry)
    private _propertyValueRegistry: PropertyValueRegistry
  ) {}

  createProperty(
    propertyDef: ThingPropertyDef,
    thingId: string,
    owner: object
  ): ThingProperty {
    let idMapper = this._thingPropertyIdMappers.get(thingId);
    if (idMapper == null) {
      idMapper = new IdMapper();
      this._thingPropertyIdMappers.set(thingId, idMapper);
    }
    const id = idMapper.createId(propertyDef.title);

    return new ThingPropertyImpl(
      propertyDef,
      id,
      thingId,
      owner,
      this._propertyValueRegistry
    );
  }
}
