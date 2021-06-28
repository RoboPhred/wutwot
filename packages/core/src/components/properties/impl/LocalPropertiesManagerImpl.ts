import { injectable, provides, inject, injectParam } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { inThingScope, InternalThingParams } from "../../things";
import { WutWotPlugin } from "../../plugin-management";
import { formCompoundId, DuplicateIDError } from "../../id-mapping";

import {
  ThingProperty,
  ThingPropertyDef,
  validatePropertyDefOrThrow,
} from "../types";

import { LocalPropertiesManager } from "../services";
import { PropertyEventSink } from "../components";

import { ThingPropertyImpl } from "./ThingPropertyImpl";

@injectable()
@inThingScope()
@provides(LocalPropertiesManager)
export class LocalPropertiesManagerImpl
  extends SelfPopulatingReadonlyMap<string, ThingProperty>
  implements LocalPropertiesManager {
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(PropertyEventSink)
    private _eventSink: PropertyEventSink,
  ) {
    super("PropertiesManager");
  }

  createProperty(def: ThingPropertyDef, owner: WutWotPlugin): ThingProperty {
    validatePropertyDefOrThrow(def);

    const id = formCompoundId(owner.id, def.pluginLocalId);
    if (this.has(id)) {
      throw new DuplicateIDError(
        `Plugin ${owner.id} has already registered a property with a plugin-local id of "${def.pluginLocalId}".`,
      );
    }

    const property = new ThingPropertyImpl(def, id, this._thingId, owner);
    this._set(id, property);
    this._eventSink.onPropertyAdded(property);

    return property;
  }
}
