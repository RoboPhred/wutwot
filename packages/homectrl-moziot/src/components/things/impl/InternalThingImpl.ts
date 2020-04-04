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

import {
  LocalActionsManager,
  ThingAction,
  ThingActionDef
} from "../../actions";
import {
  LocalPropertiesManager,
  ThingProperty,
  ThingPropertyDef
} from "../../properties";
import { LocalSemanticTypesManager } from "../../semantic-types";
import {
  LocalEventsManager,
  ThingEvent,
  ThingEventDef
} from "../../thing-events";

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
    @inject(LocalSemanticTypesManager)
    private _typesManager: LocalSemanticTypesManager,
    @inject(LocalActionsManager)
    private _actionsManager: LocalActionsManager,
    @inject(LocalPropertiesManager)
    private _propertiesManager: LocalPropertiesManager,
    @inject(LocalEventsManager)
    private _eventsManager: LocalEventsManager
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
    // TODO: Get read only view of live data.
    return makeReadOnly(this._typesManager.getTypes());
  }

  get description(): string | null {
    return this._def.description || null;
  }

  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get actions(): ReadonlyRecord<string, ThingAction> {
    const actions: Record<string, ThingAction> = {};
    // TODO: Get a read-only map proxy from propertyManager
    this._actionsManager.getAllActions().forEach(action => {
      actions[action.id] = action;
    });

    return makeReadOnly(actions);
  }

  get properties(): ReadonlyRecord<string, ThingProperty> {
    const properties: Record<string, ThingProperty> = {};
    // TODO: Get a read-only map proxy from propertyManager
    this._propertiesManager.getAllProperties().forEach(property => {
      properties[property.id] = property;
    });
    return makeReadOnly(properties);
  }

  get events(): ReadonlyRecord<string, ThingEvent> {
    const events: Record<string, ThingEvent> = {};
    // TODO: Get a read-only map proxy from propertyManager
    this._eventsManager.getAllEvents().forEach(event => {
      events[event.id] = event;
    });
    return makeReadOnly(events);
  }

  addSemanticType(type: string): void {
    this._typesManager.addType(type);
  }

  addProperty(def: ThingPropertyDef, owner: object): ThingProperty {
    return this._propertiesManager.addProperty(def, owner);
  }

  addAction(def: ThingActionDef, owner: object): ThingAction {
    return this._actionsManager.addAction(def, owner);
  }

  addEvent(def: ThingEventDef, owner: object): ThingEvent {
    return this._eventsManager.addEvent(def, owner);
  }
}
