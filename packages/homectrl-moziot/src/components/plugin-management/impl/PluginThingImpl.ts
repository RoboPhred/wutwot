import { mapValues } from "lodash";

import { ReadonlyRecord } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";
import { createReadonlyMapWrapper } from "../../../immutable";

import { Thing, ThingsManager, InternalThing } from "../../things";
import { ThingActionDef, InternalAction } from "../../actions";
import { ThingProperty, ThingPropertyDef } from "../../properties";
import { ThingEvent, ThingEventDef } from "../../thing-events";
import { MetadataIdentifier } from "../../metadata";

import {
  OwnedPluginThing,
  PluginThingAction,
  OwnedPluginThingAction,
  PluginAdapter,
} from "../types";

import { PluginThingActionImpl } from "./PluginThingActionImpl";

export class PluginThingImpl implements OwnedPluginThing {
  private _pluginActionsById: ReadonlyMap<string, PluginThingAction>;
  private _pluginActionsByInternal = new WeakMap<
    InternalAction,
    PluginThingAction
  >();

  constructor(
    private _thing: InternalThing,
    private _pluginAdapter: PluginAdapter,
    private _thingManager: ThingsManager,
  ) {
    this._pluginActionsById = createReadonlyMapWrapper(
      this._thing.actions,
      (action) => this._getPluginAction(action),
    );
  }

  get id(): string {
    return this._thing.id;
  }

  get ownerPlugin(): object {
    return this._thing.ownerPlugin;
  }

  get title(): string {
    return this._thing.title;
  }
  set title(value: string) {
    this._thing.title = value;
  }

  get semanticTypes(): readonly string[] {
    return this._thing.semanticTypes;
  }

  get description(): string {
    return this._thing.description;
  }
  set description(value: string) {
    this._thing.description = value;
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

  delete(): void {
    if (!this.isOwned()) {
      throw new Error(
        "The requesting plugin does not own this Thing.  Things can only be deleted by their owner plugins.",
      );
    }
    this._thingManager.deleteThing(this._thing.id);
  }

  isOwned(): this is OwnedPluginThing {
    return this._thing.ownerPlugin === this._pluginAdapter.plugin;
  }

  addAction(def: ThingActionDef): OwnedPluginThingAction {
    const action = this._thing.addAction(def, this._pluginAdapter.plugin);
    return new PluginThingActionImpl(
      action,
      this._pluginAdapter,
    ) as OwnedPluginThingAction;
  }

  addProperty(def: ThingPropertyDef): ThingProperty {
    return this._thing.addProperty(def, this._pluginAdapter.plugin);
  }

  addEvent(def: ThingEventDef): ThingEvent {
    const event = this._thing.addEvent(def, this._pluginAdapter.plugin);
    return event;
  }

  toThing(): Thing {
    return this._thing;
  }

  toJSON() {
    return this._thing.toJSON();
  }

  private _getPluginAction(action: InternalAction): PluginThingAction {
    let pluginAction = this._pluginActionsByInternal.get(action);
    if (!pluginAction) {
      pluginAction = new PluginThingActionImpl(action, this._pluginAdapter);
      this._pluginActionsByInternal.set(action, pluginAction);
    }
    return pluginAction;
  }
}
