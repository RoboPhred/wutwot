import { Identifier } from "microinject";
import { ThingContext } from "../ThingSource";
import { ThingActionDef, ThingActionRequestDef, ThingActionContext, ThingActionRequestContext } from "./types";
export declare const ActionSource: Identifier<ActionSource>;
/**
 * A source of thing actions.
 *
 * The source is expected to have knowledge of the things it provides
 * actions for.
 *
 * This may be implemented on the same class as the ThingSource,
 * or it may be seperated to provide actions in a mixin style.
 */
export interface ActionSource {
    /**
     * The ID of the action source.  Used to disambiguate
     * actions when multiple sources are in play on a single thing.
     */
    readonly id: string;
    /**
     * Determines what actions are supported on the given thing.
     * @param thingContext The context of the thing to fetch actions for.
     */
    getThingActions(thingContext: ThingContext): ReadonlyArray<ThingActionDef>;
    /**
     * Gets an array of invocations pending for the given thing.
     * @param thingContext The context of the thing to fetch invocations for.
     */
    getThingActionRequests(thingContext: ThingContext): ReadonlyArray<ThingActionRequestDef>;
    /**
     *
     * @param actionContext The context the action to invoke.
     * @param input The action input.
     */
    requestAction(actionContext: ThingActionContext, input: any): ThingActionRequestDef;
    /**
     * Cancels a pending request.
     * @param requestContext The context of the request to cancel.
     */
    cancelRequest(requestContext: ThingActionRequestContext): boolean;
}
