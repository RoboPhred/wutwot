import { mapValues } from "lodash";

import { ReadonlyRecord } from "../../../../types";

import { Thing, ThingService } from "../../../things";
import { ThingTypeService } from "../../../thing-types";
import { ThingActionDef, ActionService } from "../../../actions";
import {
  ThingProperty,
  ThingPropertyDef,
  PropertyService
} from "../../../properties";
import { ThingEvent } from "../../../thing-events";

import {
  OwnedPluginThing,
  PluginThingAction,
  OwnedPluginThingAction,
  PluginAdapter
} from "../../types";

import { PluginThingActionFactory } from "../PluginThingActionFactory";

export class PluginThingImpl implements OwnedPluginThing {
  constructor(
    private _thing: Thing,
    private _pluginAdapter: PluginAdapter,
    private _thingService: ThingService,
    private _thingTypeService: ThingTypeService,
    private _actionService: ActionService,
    private _propertyService: PropertyService,
    private _pluginThingActionFactory: PluginThingActionFactory
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
    const actions = mapValues(this._thing.actions, action =>
      this._pluginThingActionFactory.getThingAction(action, this._pluginAdapter)
    );
    return Object.freeze(actions);
  }

  get properties(): ReadonlyRecord<string, ThingProperty> {
    return this._thing.properties;
  }

  get events(): ReadonlyRecord<string, ThingEvent> {
    return this._thing.events;
  }

  addType(type: string): OwnedPluginThing {
    this._thingTypeService.addType(this._thing.id, type);
    return this;
  }

  delete(): void {
    if (!this.isOwned()) {
      throw new Error(
        "The requesting plugin does not own this Thing.  Things can only be deleted by their owner plugins."
      );
    }
    // TODO: Remove all properties, actions, types, action-requests.
    //  Should be done in response to removal events from thingService
    this._thingService.removeThing(this._thing.id);
  }

  isOwned(): this is OwnedPluginThing {
    return this._thing.ownerPlugin === this._pluginAdapter.plugin;
  }

  addAction(def: ThingActionDef): OwnedPluginThingAction {
    const action = this._actionService.addAction(
      this._thing.id,
      def,
      this._pluginAdapter.plugin
    );
    const thingAction = this._pluginThingActionFactory.getThingAction(
      action,
      this._pluginAdapter
    );
    return thingAction as OwnedPluginThingAction;
  }

  addProperty(def: ThingPropertyDef): ThingProperty {
    const property = this._propertyService.addProperty(
      this._thing.id,
      def,
      this._pluginAdapter.plugin
    );
    return property;
  }

  toThing(): Thing {
    return this._thing;
  }
}
