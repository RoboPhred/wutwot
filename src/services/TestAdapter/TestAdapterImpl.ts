import { injectable, provides, singleton } from "microinject";

import uuidV4 from "uuid/v4";

import {
  ThingDef,
  ThingActionRequestDef,
  ThingProviderPlugin,
  ThingActionContext,
  ThingActionRequestContext,
  ThingProviderPluginAdapter,
  ThingActionSourcePlugin,
  ActionProviderPlugin
} from "../MozIOT";

const testActionDef = Object.freeze({
  actionId: "thing-test-action",
  actionLabel: "Do That Thing",
  actionDescription: "A test action",
  actionInput: { type: "null" as "null" },
  actionMetadata: {}
});

@injectable()
@singleton()
@provides(ThingProviderPlugin)
@provides(ActionProviderPlugin)
export class TestAdapterImpl
  implements ThingProviderPlugin, ActionProviderPlugin {
  public readonly id: "test-adapter" = "test-adapter";

  private _thingPlugin: ThingProviderPluginAdapter = null as any;
  private _actionPlugin: ThingActionSourcePlugin = null as any;

  private readonly _requests: ThingActionRequestDef[] = [];

  constructor() {}

  // TODO: onRegisterThingSource and onRegisterActionSource can be combined
  //  if we are smarter about how we check for what implements what.
  // TODO: For best results, pass it in the ctor using the yet
  //  incomplete microinject instantiation time parameter stuff.

  onRegisterThingProvider(plugin: ThingProviderPluginAdapter) {
    this._thingPlugin = plugin;
    // One of these will noop as both will not be called yet.
    this.addTestThing();
  }

  onRegisterThingActionSource(plugin: ThingActionSourcePlugin) {
    this._actionPlugin = plugin;
    // One of these will noop as both will not be called yet.
    this.addTestThing();
  }

  onActionRequested(actionContext: ThingActionContext, input: any) {
    const request: ThingActionRequestDef = Object.freeze({
      requestId: uuidV4(),
      thingId: actionContext.thingId,
      actionId: actionContext.actionId,
      requestCreatedTime: new Date().toISOString(),
      requestMetadata: {}
    });

    console.log(
      "Test action starting on",
      actionContext.thingId,
      "=>",
      request
    );
    this._requests.push(request);

    setTimeout(() => {
      const index = this._requests.indexOf(request);
      if (index > -1) {
        console.log(
          "Test action ending on",
          actionContext.thingId,
          "=>",
          request
        );
        this._requests.splice(index, 1);
      }
    }, 10 * 1000);

    this._actionPlugin.addActionRequest(request);
  }

  onActionRequestCancelRequested(requestContext: ThingActionRequestContext) {
    const { requestId } = requestContext;

    const index = this._requests.findIndex(x => x.requestId === requestId);
    if (index) {
      this._requests.splice(index, 1);
      this._actionPlugin.removeActionRequest(requestContext.requestId);
      return true;
    }
    return false;
  }

  addTestThing(def?: Partial<ThingDef>) {
    if (!this._actionPlugin || !this._thingPlugin) {
      return;
    }

    if (!def) {
      def = {};
    }

    const thingId =
      def.thingId ||
      `test-device-${Math.random()
        .toString()
        .substr(2)}`;
    const defaultName = def.thingDefaultName || `Named: ${thingId}`;

    const finalDef = {
      thingId,
      description: "A test thing",
      defaultName
    };

    this._thingPlugin.addThing(finalDef);
    this._actionPlugin.addAction({
      ...testActionDef,
      thingId
    });
  }

  removeTestThing(thingId: string) {
    this._thingPlugin.removeThing(thingId);
  }
}
