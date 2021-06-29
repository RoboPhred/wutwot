import { injectable, provides, inject, injectParam } from "microinject";

import { SelfPopulatingReadonlyMap } from "../../../utils/SelfPopulatingReadonlyMap";

import { inThingScope, InternalThingParams, ThingsManager } from "../../things";
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
import { PropertyFormProvider } from "../contracts";
import { flatMap } from "lodash";

@injectable()
@inThingScope()
@provides(LocalPropertiesManager)
export class LocalPropertiesManagerImpl
  extends SelfPopulatingReadonlyMap<string, ThingProperty>
  implements LocalPropertiesManager
{
  constructor(
    @injectParam(InternalThingParams.ThingId)
    private _thingId: string,
    @inject(PropertyEventSink)
    private _eventSink: PropertyEventSink,
    @inject(ThingsManager)
    private _thingsManager: ThingsManager,
    @inject(PropertyFormProvider, { all: true, optional: true })
    private _formProviders: PropertyFormProvider[] = [],
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

    // TODO: Not happy with this code...
    // We need to get the forms for the property, and to do that we need the reference to the thing and the thing property.
    const ownerThing = this._thingsManager.get(this._thingId);
    if (!ownerThing) {
      throw new Error(
        "Tried to create a property for a Thing that is not yet registered.",
      );
    }

    const property = new ThingPropertyImpl(def, id, this._thingId, owner);
    this._set(id, property);

    const forms = flatMap(this._formProviders, (provider) =>
      provider.getPropertyForms(ownerThing?.publicProxy, property),
    );
    property.updateForms(forms);

    this._eventSink.onPropertyAdded(property);

    return property;
  }
}
