import {
  injectable,
  asScope,
  inject,
  injectParam,
  provides
} from "microinject";

import { ReadonlyRecord } from "../../../../types";

import { ThingTypeService } from "../../../thing-types";
import { ActionService, ThingAction } from "../../../actions";
import { PropertyService, ThingProperty } from "../../../properties";
import { EventService, ThingEvent } from "../../../thing-events";

import { ThingDef } from "../../types";
import { ThingScope } from "../../scopes";
import { InternalThing, InternalThingCreationParams } from "../../services";

@injectable()
@provides(InternalThing)
@asScope(ThingScope)
export class InternalThingImpl implements InternalThing {
  private readonly _metadata: Record<string, any>;

  constructor(
    @injectParam(InternalThingCreationParams.ThingDef)
    private _def: ThingDef,
    @injectParam(InternalThingCreationParams.ThingId)
    private _id: string,
    @injectParam(InternalThingCreationParams.Owner)
    private _owner: object,
    @inject(ThingTypeService)
    private _typeService: ThingTypeService,
    @inject(ActionService)
    private _actionService: ActionService,
    @inject(PropertyService)
    private _propertyService: PropertyService,
    @inject(EventService)
    private _eventService: EventService
  ) {
    this._def = {
      ..._def
    };
    this._metadata = { ..._def.metadata };
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

    return Object.seal(actions);
  }

  get properties(): ReadonlyRecord<string, ThingProperty> {
    const properties: Record<string, ThingProperty> = {};
    this._propertyService.getForThing(this._id).forEach(property => {
      properties[property.id] = property;
    });
    return Object.seal(properties);
  }

  get events(): ReadonlyRecord<string, ThingEvent> {
    const events: Record<string, ThingEvent> = {};
    this._eventService.getForThing(this._id).forEach(event => {
      events[event.id] = event;
    });
    return Object.seal(events);
  }
}
