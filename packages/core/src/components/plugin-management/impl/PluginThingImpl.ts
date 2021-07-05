import { Form } from "@wutwot/td";

import {
  createReadonlyMapWrapper,
  DeepImmutableArray,
} from "../../../immutable";

import { Thing, ThingsManager, InternalThing } from "../../things";
import { ThingActionDef, InternalAction } from "../../actions";
import { ThingProperty, ThingPropertyDef } from "../../properties";
import { ThingEvent, ThingEventDef } from "../../thing-events";
import { MetadataIdentifier } from "../../metadata";
import { DataPersistence } from "../../persistence";

import {
  OwnedPluginThing,
  PluginThingAction,
  OwnedPluginThingAction,
} from "../types";
import { WutWotPlugin } from "../contracts";

import { PluginThingActionImpl } from "./PluginThingActionImpl";
import { PluginLocalThingDataPersistence } from "./PluginLocalThingDataPersistence";

export class PluginThingImpl implements OwnedPluginThing {
  private _pluginActionsById: ReadonlyMap<string, PluginThingAction>;
  private _pluginActionsByInternal = new WeakMap<
    InternalAction,
    PluginThingAction
  >();
  private _pluginLocalPersistence: DataPersistence | null = null;

  constructor(
    private readonly _thing: InternalThing,
    private readonly _plugin: WutWotPlugin,
    private readonly _thingManager: ThingsManager,
  ) {
    this._pluginActionsById = createReadonlyMapWrapper(
      this._thing.actions,
      (action) => this._getPluginAction(action),
      "ThingActionMap",
    );
  }

  get id(): string {
    return this._thing.id;
  }

  get ownerPlugin(): object {
    return this._thing.ownerPlugin;
  }

  get title(): string | undefined {
    return this._thing.title;
  }

  get semanticTypes(): readonly string[] {
    return this._thing.semanticTypes;
  }

  get description(): string | undefined {
    return this._thing.description;
  }

  get actions(): ReadonlyMap<string, PluginThingAction> {
    return this._pluginActionsById;
  }

  get properties(): ReadonlyMap<string, ThingProperty> {
    return this._thing.properties;
  }

  get events(): ReadonlyMap<string, ThingEvent> {
    return this._thing.events;
  }

  get forms(): DeepImmutableArray<Form> {
    return this._thing.forms;
  }

  getMetadataKeys(): MetadataIdentifier<unknown>[] {
    return this._thing.getMetadataKeys();
  }

  getMetadata<T>(identifier: MetadataIdentifier<T>): T | undefined {
    return this._thing.getMetadata(identifier);
  }

  addSemanticType(type: string): OwnedPluginThing {
    this._thing.addSemanticType(type);
    return this;
  }

  getPluginLocalPersistence(): DataPersistence {
    if (!this._pluginLocalPersistence) {
      this._pluginLocalPersistence = new PluginLocalThingDataPersistence(
        this._thing.persistence,
        this._plugin.id,
      );
    }

    return this._pluginLocalPersistence;
  }

  delete(): void {
    if (!this.isOwned()) {
      throw new Error(
        "The requesting plugin does not own this Thing.  Things can only be deleted by their owner plugins.",
      );
    }
    this._thingManager.deleteThing(this._thing.id);
  }

  isOwned(): this is OwnedPluginThing {
    return this._thing.ownerPlugin === this._plugin;
  }

  addAction(def: ThingActionDef): OwnedPluginThingAction {
    const action = this._thing.addAction(def, this._plugin);
    return new PluginThingActionImpl(
      action,
      this._plugin,
    ) as OwnedPluginThingAction;
  }

  addProperty(def: ThingPropertyDef): ThingProperty {
    return this._thing.addProperty(def, this._plugin);
  }

  addEvent(def: ThingEventDef): ThingEvent {
    const event = this._thing.addEvent(def, this._plugin);
    return event;
  }

  toThing(): Thing {
    return this._thing;
  }

  toJSON() {
    return this._thing.toJSON();
  }

  toJSONLD() {
    return this._thing.toJSONLD();
  }

  private _getPluginAction(action: InternalAction): PluginThingAction {
    let pluginAction = this._pluginActionsByInternal.get(action);
    if (!pluginAction) {
      pluginAction = new PluginThingActionImpl(action, this._plugin);
      this._pluginActionsByInternal.set(action, pluginAction);
    }
    return pluginAction;
  }
}
