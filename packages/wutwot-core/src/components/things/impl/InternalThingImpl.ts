import {
  injectable,
  asScope,
  inject,
  injectParam,
  provides,
} from "microinject";
import { mapValues } from "lodash";
import { inspect } from "util";
import { W3cWotTDTerms, DCMITermsTerms } from "@wutwot/td";

import { makeReadOnly, createReadonlyMapWrapper } from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";
import { mapToObject } from "../../../utils/map";

import {
  LocalActionsManager,
  ThingAction,
  ThingActionDef,
  InternalAction,
} from "../../actions";
import {
  LocalPropertiesManager,
  ThingProperty,
  ThingPropertyDef,
} from "../../properties";
import { LocalSemanticTypesManager } from "../../semantic-types";
import {
  LocalEventsManager,
  ThingEvent,
  ThingEventDef,
} from "../../thing-events";
import { DataPersistence, DataPersistenceKey } from "../../persistence";
import { metadataObjectToMap, MetadataIdentifier } from "../../metadata";

import { ThingDef, Thing } from "../types";
import { ThingScope } from "../scopes";
import {
  InternalThing,
  InternalThingParams,
  ThingLocalPersistence,
} from "../services";
import { nonEmptyArray } from "../../../utils/types";

namespace ThingPersistenceKeys {
  export const Name: DataPersistenceKey = ["name"];
  export const Description: DataPersistenceKey = ["description"];
}

@injectable()
@provides(InternalThing)
@asScope(ThingScope)
export class InternalThingImpl implements InternalThing {
  private readonly _publicProxy: Thing;
  private _title: string | undefined;
  private _description: string | undefined;
  private _metadata = new Map<string | symbol, any>();

  private _actions: ReadonlyMap<string, InternalAction>;
  private _properties: ReadonlyMap<string, ThingProperty>;
  private _events: ReadonlyMap<string, ThingEvent>;

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
    private _eventsManager: LocalEventsManager,
  ) {
    this._def = {
      ..._def,
    };
    metadataObjectToMap(_def.metadata || {}, this._metadata);

    this._title = this._persistence.get(
      ThingPersistenceKeys.Name,
      _def.defaultTitle,
    );
    this._description = this._persistence.get(
      ThingPersistenceKeys.Description,
      _def.defaultDescription,
    );

    // Create masks of the managers to prevent
    //  tampering with internal properties.
    this._actions = createReadonlyMapWrapper(
      this._actionsManager,
      undefined,
      "ThingActionMap",
    );
    this._properties = createReadonlyMapWrapper(
      this._propertiesManager,
      undefined,
      "ThingPropertyMap",
    );
    this._events = createReadonlyMapWrapper(
      this._eventsManager,
      undefined,
      "ThingEventMap",
    );

    this._publicProxy = createPublicThingApi(this);
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

  get title(): string | undefined {
    return this._title;
  }
  set title(value: string | undefined) {
    this._title = value;
    this._persistence.set(ThingPersistenceKeys.Name, value);
  }

  get semanticTypes(): ReadonlyArray<string> {
    // TODO: Get read only view of live data.
    return makeReadOnly(this._typesManager.getTypes());
  }

  get description(): string | undefined {
    return this._description;
  }
  set description(value: string | undefined) {
    this._description = value;
    this._persistence.set(ThingPersistenceKeys.Description, value);
  }

  get actions(): ReadonlyMap<string, InternalAction> {
    return this._actions;
  }

  get properties(): ReadonlyMap<string, ThingProperty> {
    return this._properties;
  }

  get events(): ReadonlyMap<string, ThingEvent> {
    return this._events;
  }

  addSemanticType(type: string): void {
    this._typesManager.addType(type);
  }

  addProperty(def: ThingPropertyDef, owner: object): ThingProperty {
    return this._propertiesManager.createProperty(def, owner);
  }

  addAction(def: ThingActionDef, owner: object): InternalAction {
    return this._actionsManager.createAction(def, owner);
  }

  addEvent(def: ThingEventDef, owner: object): ThingEvent {
    return this._eventsManager.createEvent(def, owner);
  }

  getMetadataKeys() {
    return Array.from(this._metadata.keys()) as MetadataIdentifier<unknown>[];
  }

  getMetadata<T>(identifier: MetadataIdentifier<T>): T | undefined {
    return this._metadata.get(identifier) as T;
  }

  toJSON() {
    return {
      id: this.id,
      ownerPlugin: this.ownerPlugin,
      title: this.title,
      semanticTypes: [...this.semanticTypes],
      description: this.description,
      metadata: mapToObject(this._metadata),
      actions: mapValues(mapToObject(this.actions), (action) =>
        action.toJSON(),
      ),
      properties: mapValues(mapToObject(this.properties), (property) =>
        property.toJSON(),
      ),
      events: mapValues(mapToObject(this.events), (event) => event.toJSON()),
    };
  }

  toJSONLD() {
    const actions = Array.from(this.actions.values()).map((x) => x.toJSONLD());
    const events = Array.from(this.events.values()).map((x) => x.toJSONLD());
    const properties = Array.from(this.properties.values()).map((x) =>
      x.toJSONLD(),
    );

    return {
      "@id": this.id,
      // TODO: semanticTypes should always be full resolved IRIs
      "@types": [...this.semanticTypes],
      [DCMITermsTerms.Title]: this.title,
      [DCMITermsTerms.Description]: this.description,
      [W3cWotTDTerms.HasActionAffordance]: nonEmptyArray(actions, undefined),
      [W3cWotTDTerms.HasEventAffordance]: nonEmptyArray(events, undefined),
      [W3cWotTDTerms.HasPropertyAffordance]: nonEmptyArray(
        properties,
        undefined,
      ),
    };
  }
}

// Move this somewhere.  Make a factory for it?
function createPublicThingApi(thing: InternalThing) {
  // We need to convert the InternalThing api of InternalActions
  //  to the public api ThingActions
  const publicActions = createReadonlyMapWrapper(
    thing.actions,
    (internal) => internal.publicAPI,
    "ThingActionMap",
  );

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

    get title(): string | undefined {
      return thing.title;
    }
    set title(value: string | undefined) {
      thing.title = value;
    }

    get semanticTypes(): readonly string[] {
      return thing.semanticTypes;
    }

    get description(): string | undefined {
      return thing.description;
    }
    set description(value: string | undefined) {
      thing.description = value;
    }

    get actions(): ReadonlyMap<string, ThingAction> {
      return publicActions;
    }

    get properties(): ReadonlyMap<string, ThingProperty> {
      // Already masked by InternalThing
      return thing.properties;
    }

    get events(): ReadonlyMap<string, ThingEvent> {
      // Already masked by InternalThing
      return thing.events;
    }

    getMetadataKeys() {
      return thing.getMetadataKeys();
    }

    getMetadata<T>(identifier: MetadataIdentifier<T>): T | undefined {
      return thing.getMetadata(identifier);
    }

    toJSON() {
      return thing.toJSON();
    }

    toJSONLD() {
      return thing.toJSONLD();
    }
  }

  return new PublicThing();
}
