import { mapValues } from "lodash";

import { ReadonlyRecord } from "../../../types";
import { makeReadOnly } from "../../../utils/readonly";

import { Thing, ThingsManager, InternalThing } from "../../things";
import { ThingActionDef } from "../../actions";
import { ThingProperty, ThingPropertyDef } from "../../properties";
import { ThingEvent, ThingEventDef } from "../../thing-events";

import {
  OwnedPluginThing,
  PluginThingAction,
  OwnedPluginThingAction,
  PluginAdapter
} from "../types";
import { PluginThingActionImpl } from "./PluginThingActionImpl";

export class PluginThingImpl implements OwnedPluginThing {
  constructor(
    private _thing: InternalThing,
    private _pluginAdapter: PluginAdapter,
    private _thingManager: ThingsManager
  ) {}

  get id(): string {
    return this._thing.id;
  }

  get ownerPlugin(): object {
    return this._thing.ownerPlugin;
  }

  get title(): string {
    return this._thing.title;
  }

  get semanticTypes(): readonly string[] {
    return this._thing.semanticTypes;
  }

  get description(): string | null {
    return this._thing.description;
  }

  get metadata(): Record<string, any> {
    return this._thing.metadata;
  }

  get actions(): ReadonlyRecord<string, PluginThingAction> {
    const actions = mapValues(
      this._thing.actions,
      action => new PluginThingActionImpl(action, this._pluginAdapter)
    );
    return makeReadOnly(actions);
  }

  get properties(): ReadonlyRecord<string, ThingProperty> {
    return this._thing.properties;
  }

  get events(): ReadonlyRecord<string, ThingEvent> {
    return this._thing.events;
  }

  addSemanticType(type: string): OwnedPluginThing {
    this._thing.addSemanticType(type);
    return this;
  }

  delete(): void {
    if (!this.isOwned()) {
      throw new Error(
        "The requesting plugin does not own this Thing.  Things can only be deleted by their owner plugins."
      );
    }
    this._thingManager.removeThing(this._thing.id);
  }

  isOwned(): this is OwnedPluginThing {
    return this._thing.ownerPlugin === this._pluginAdapter.plugin;
  }

  addAction(def: ThingActionDef): OwnedPluginThingAction {
    const action = this._thing.addAction(def, this._pluginAdapter.plugin);
    return new PluginThingActionImpl(
      action,
      this._pluginAdapter
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
}