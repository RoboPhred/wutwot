import {
  injectable,
  asScope,
  inject,
  injectParam,
  provides
} from "microinject";
import { mapValues } from "lodash";
import { inspect } from "util";

import { makeReadOnly } from "../../../utils/readonly";
import { makeInspectJson } from "../../../utils/inspect";
import { ReadonlyRecord } from "../../../types";

import {
  LocalActionsManager,
  ThingAction,
  ThingActionDef,
  InternalAction
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

import { ThingDef, Thing } from "../types";
import { ThingScope } from "../scopes";
import {
  InternalThing,
  InternalThingParams,
  ThingLocalPersistence
} from "../services";
import { DataPersistence, DataStorageKey } from "../../persistence";

namespace ThingPersistenceKeys {
  export const Name: DataStorageKey = ["name"];
  export const Description: DataStorageKey = ["description"];
}

@injectable()
@provides(InternalThing)
@asScope(ThingScope)
export class InternalThingImpl implements InternalThing {
  constructor(
    @injectParam(InternalThingParams.ThingDef)
    private _def: ThingDef,
    @injectParam(InternalThingParams.ThingId)
    private _id: string,
    @injectParam(InternalThingParams.Owner)
    private _owner: object,
    @inject(ThingLocalPersistence)
    private _persistence: DataPersistence,
    @inject(LocalSemanticTypesManager)
    private _typesManager: LocalSemanticTypesManager,
    @inject(LocalActionsManager)
    private _actionsManager: LocalActionsManager,
    @inject(LocalPropertiesManager)
    private _propertiesManager: LocalPropertiesManager,
    @inject(LocalEventsManager)
    private _eventsManager: LocalEventsManager
  ) {
    this._def = {
      ..._def
    };
    this._metadata = { ..._def.metadata };

    this._title = this._persistence.get(
      ThingPersistenceKeys.Name,
      _def.defaultTitle
    );
    this._description =
      this._persistence.get(
        ThingPersistenceKeys.Description,
        _def.defaultDescription
      ) ?? "";

    this._publicProxy = createPublicThingApi(this);
  }

  private readonly _publicProxy: Thing;
  get publicProxy(): Thing {
    return this._publicProxy;
  }

  get id(): string {
    return this._id;
  }

  get ownerPlugin(): object {
    return this._owner;
  }

  private _title: string;
  get title(): string {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
    this._persistence.set(ThingPersistenceKeys.Name, value);
  }

  get semanticTypes(): ReadonlyArray<string> {
    // TODO: Get read only view of live data.
    return makeReadOnly(this._typesManager.getTypes());
  }

  private _description: string;
  get description(): string {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
    this._persistence.set(ThingPersistenceKeys.Description, value);
  }

  private readonly _metadata: Record<string, any>;
  get metadata(): Record<string, any> {
    return this._metadata;
  }

  get actions(): ReadonlyRecord<string, InternalAction> {
    const actions: Record<string, InternalAction> = {};
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

  addAction(def: ThingActionDef, owner: object): InternalAction {
    return this._actionsManager.addAction(def, owner);
  }

  addEvent(def: ThingEventDef, owner: object): ThingEvent {
    return this._eventsManager.addEvent(def, owner);
  }

  toJSON() {
    return {
      id: this.id,
      ownerPlugin: this.ownerPlugin,
      title: this.title,
      semanticTypes: this.semanticTypes,
      description: this.description,
      metadata: this.metadata,
      actions: mapValues(this.actions, action => action.toJSON()),
      properties: mapValues(this.properties, property => property.toJSON()),
      events: mapValues(this.events, event => event.toJSON())
    };
  }
}

// Move this somewhere.  Make a factory for it?
function createPublicThingApi(thing: InternalThing) {
  class PublicThing implements Thing {
    get [Symbol.toStringTag]() {
      return "Thing";
    }

    [inspect.custom] = makeInspectJson("Thing");

    get id(): string {
      return thing.id;
    }

    get ownerPlugin(): object {
      return thing.ownerPlugin;
    }

    get title(): string {
      return thing.title;
    }
    set title(value: string) {
      thing.title = value;
    }

    get semanticTypes(): readonly string[] {
      return thing.semanticTypes;
    }

    get description(): string {
      return thing.description;
    }
    set description(value: string) {
      thing.description = value;
    }

    get metadata(): Record<string, any> {
      return thing.metadata;
    }

    get actions(): Readonly<Record<string, ThingAction>> {
      // TODO: Preserve live instance view.
      return mapValues(thing.actions, action => action.publicProxy);
    }

    get properties(): Readonly<Record<string, ThingProperty>> {
      return thing.properties;
    }

    get events(): Readonly<Record<string, ThingEvent>> {
      return thing.events;
    }

    toJSON() {
      return thing.toJSON();
    }
  }

  return new PublicThing();
}
