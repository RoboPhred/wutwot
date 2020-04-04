import {
  injectable,
  asScope,
  inject,
  injectParam,
  provides
} from "microinject";

import { makeReadOnly } from "../../../utils/readonly";
import { createWhitelistProxy } from "../../../utils/proxies";
import { ReadonlyRecord } from "../../../types";

import { ThingTypeService } from "../../thing-types";
import { ActionService, ThingAction } from "../../actions";
import {
  LocalPropertyManager,
  ThingProperty,
  ThingPropertyDef
} from "../../properties";
import { EventService, ThingEvent } from "../../thing-events";

import { ThingDef, ThingKeys, Thing } from "../types";
import { ThingScope } from "../scopes";
import { InternalThing, InternalThingParams } from "../services";

@injectable()
@provides(InternalThing)
@asScope(ThingScope)
export class InternalThingImpl implements InternalThing {
  private readonly _publicProxy: Thing;

  private readonly _metadata: Record<string, any>;

  constructor(
    @injectParam(InternalThingParams.ThingDef)
    private _def: ThingDef,
    @injectParam(InternalThingParams.ThingId)
    private _id: string,
    @injectParam(InternalThingParams.Owner)
    private _owner: object,
    @inject(ThingTypeService)
    private _typeService: ThingTypeService,
    @inject(ActionService)
    private _actionService: ActionService,
    @inject(LocalPropertyManager)
    private _propertyManager: LocalPropertyManager,
    @inject(EventService)
    private _eventService: EventService
  ) {
    this._publicProxy = createWhitelistProxy(this, ThingKeys);
    this._def = {
      ..._def
    };
    this._metadata = { ..._def.metadata };
  }

  get publicProxy(): Thing {
    return this._publicProxy;
  }

  get id(): string {
    return this._id;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  get title(): string {
    return this._def.title;
  }

  get semanticTypes(): ReadonlyArray<string> {
    return this._typeService.getTypes(this._id);
  }

  get description(): string | null {
    return this._def.description || null;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    const actions: Record<string, ThingAction> = {};
    this._actionService.getForThing(this._id).forEach(action => {
      actions[action.id] = action;
    });

    return makeReadOnly(actions);
  }

  get properties(): ReadonlyRecord<string, ThingProperty> {
    const properties: Record<string, ThingProperty> = {};
    // TODO: Get a read-only map proxy from propertyManager
    this._propertyManager.getAllProperties().forEach(property => {
      properties[property.id] = property;
    });
    return makeReadOnly(properties);
  }

  get events(): ReadonlyRecord<string, ThingEvent> {
    const events: Record<string, ThingEvent> = {};
    this._eventService.getForThing(this._id).forEach(event => {
      events[event.id] = event;
    });
    return makeReadOnly(events);
  }

  addProperty(def: ThingPropertyDef, owner: object): ThingProperty {
    return this._propertyManager.createProperty(def, owner);
  }
}
