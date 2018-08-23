import { ThingDef, ThingProviderPlugin, ThingActionContext, ThingActionRequestContext, ThingProviderPluginAdapter, ThingActionSourcePlugin, ActionProviderPlugin } from "../MozIOT";
export declare class TestAdapterImpl implements ThingProviderPlugin, ActionProviderPlugin {
    readonly id: "test-adapter";
    private _thingPlugin;
    private _actionPlugin;
    private readonly _requests;
    constructor();
    onRegisterThingProvider(plugin: ThingProviderPluginAdapter): void;
    onRegisterThingActionSource(plugin: ThingActionSourcePlugin): void;
    onActionRequested(actionContext: ThingActionContext, input: any): void;
    onActionRequestCancelRequested(requestContext: ThingActionRequestContext): boolean;
    addTestThing(def?: Partial<ThingDef>): void;
    removeTestThing(thingId: string): void;
}
