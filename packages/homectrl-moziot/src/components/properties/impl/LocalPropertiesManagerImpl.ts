import { injectable, provides, inject, injectParam } from "microinject";

import { LegacyIdMapper } from "../../../utils/LegacyIdMapper";

import { inThingScope, InternalThingParams } from "../../things";

import {
  ThingProperty,
  ThingPropertyDef,
  validatePropertyDefOrThrow,
} from "../types";

import { LocalPropertiesManager } from "../services";
import { PropertyEventSink } from "../components";

import { ThingPropertyImpl } from "./ThingPropertyImpl";
import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

@injectable()
@inThingScope()
@provides(LocalPropertiesManager)
export class LocalPropertiesManagerImpl
  extends SelfPopulatingReadonlyMap<string, ThingProperty>
  implements LocalPropertiesManager {
  private _idMapper = new LegacyIdMapper();

  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(PropertyEventSink)
    private _eventSink: PropertyEventSink,
  ) {
    super();
  }

  createProperty(propertyDef: ThingPropertyDef, owner: object): ThingProperty {
    validatePropertyDefOrThrow(propertyDef);

    const propertyId = this._idMapper.createId(propertyDef.title);
    const property = new ThingPropertyImpl(
      propertyDef,
      propertyId,
      this._thingId,
      owner,
    );
    this._set(property.id, property);
    this._eventSink.onPropertyAdded(property);
    return property;
  }
}
