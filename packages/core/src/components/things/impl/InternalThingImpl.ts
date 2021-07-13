import {
  injectable,
  asScope,
  inject,
  injectParam,
  provides,
} from "microinject";
import { cloneDeep, mapValues } from "lodash";
import { inspect } from "util";
import { DCMITermsIRIs } from "@wutwot/ld";
import { W3cWotTdIRIs, Form, W3cWotFormContext } from "@wutwot/w3c-td";

import {
  makeReadOnly,
  createReadonlyMapWrapper,
  DeepImmutableArray,
  makeReadOnlyDeep,
} from "../../../immutable";
import { makeInspectJson } from "../../../utils/inspect";
import { mapToObject } from "../../../utils/map";
import { nonEmptyArray } from "../../../utils/types";
import { addContext } from "../../../utils/json-ld";

import {
  LocalActionsManager,
  ThingAction,
  ThingActionDef,
  InternalAction,
} from "../../actions";
import {
  FormProvider,
  LocalPropertiesManager,
  ThingProperty,
  ThingPropertyDef,
} from "../../properties";
import {
  LocalEventsManager,
  ThingEvent,
  ThingEventDef,
} from "../../thing-events";
import { metadataObjectToMap, MetadataIdentifier } from "../../metadata";
import { DataPersistence } from "../../persistence";
import { getThingForms } from "../../forms";

import { ThingDef, Thing } from "../types";
import { ThingScope } from "../scopes";
import { InternalThing, InternalThingParams } from "../services";
import { ThingLocalPersistence } from "../components";

@injectable()
@provides(InternalThing)
@asScope(ThingScope)
export class InternalThingImpl implements InternalThing {
  private readonly _publicProxy: Thing;
  private _title: string;
  private _description: string | undefined;
  private _semanticTypes = new Set<string>();
  private _metadata = new Map<string | symbol, any>();

  private _actions: ReadonlyMap<string, InternalAction>;
  private _properties: ReadonlyMap<string, ThingProperty>;
  private _events: ReadonlyMap<string, ThingEvent>;

  constructor(
    @injectParam(InternalThingParams.ThingDef)
    def: ThingDef,
    @injectParam(InternalThingParams.ThingId)
    private _id: string,
    @injectParam(InternalThingParams.Owner)
    private _owner: object,
    @inject(ThingLocalPersistence)
    private _persistence: DataPersistence,
    @inject(LocalActionsManager)
    private _actionsManager: LocalActionsManager,
    @inject(LocalPropertiesManager)
    private _propertiesManager: LocalPropertiesManager,
    @inject(LocalEventsManager)
    private _eventsManager: LocalEventsManager,
    @inject(FormProvider)
    private _formProviders: FormProvider[],
  ) {
    metadataObjectToMap(def.metadata || {}, this._metadata);

    this._title = def.title;
    this._description = def.description;

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

  get semanticTypes(): ReadonlyArray<string> {
    return makeReadOnly([W3cWotTdIRIs.Thing, ...this._semanticTypes]);
  }

  get description(): string | undefined {
    return this._description;
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

  get forms(): DeepImmutableArray<Form> {
    return makeReadOnlyDeep(
      cloneDeep(getThingForms(this._formProviders, this)),
    );
  }

  get persistence(): DataPersistence {
    return this._persistence;
  }

  addSemanticType(type: string): void {
    this._semanticTypes.add(type);
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

  addMetadata<T>(identifier: MetadataIdentifier<T>, value: T): this {
    this._metadata.set(identifier, value);
    return this;
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
      forms: this.forms,
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
      "@type": this.semanticTypes,
      // [W3cRdfSyntaxIRIs.Type]: this.semanticTypes.map(asID()),
      [DCMITermsIRIs.Title]: this.title,
      [DCMITermsIRIs.Description]: this.description,
      [W3cWotTdIRIs.HasActionAffordance]: nonEmptyArray(actions, undefined),
      [W3cWotTdIRIs.HasEventAffordance]: nonEmptyArray(events, undefined),
      [W3cWotTdIRIs.HasPropertyAffordance]: nonEmptyArray(
        properties,
        undefined,
      ),
      [W3cWotTdIRIs.HasForm]: nonEmptyArray(
        this.forms.map(addContext(W3cWotFormContext)),
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

    get semanticTypes(): readonly string[] {
      return thing.semanticTypes;
    }

    get description(): string | undefined {
      return thing.description;
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

    get forms(): DeepImmutableArray<Form> {
      return thing.forms;
    }

    getMetadataKeys() {
      return thing.getMetadataKeys();
    }

    getMetadata<T>(identifier: MetadataIdentifier<T>): T | undefined {
      return thing.getMetadata(identifier);
    }

    addMetadata<T>(identifier: MetadataIdentifier<T>, value: T): this {
      thing.addMetadata(identifier, value);
      return this;
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
