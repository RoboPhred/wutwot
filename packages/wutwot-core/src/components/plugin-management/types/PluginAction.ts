import { ThingAction } from "../../actions";
import { ThingActionRequestDef } from "../../action-requests";
import { ThingActionRequest } from "../../action-requests";

/**
 * An instance of a MozIot Thing Action, with additional functionality for use by plugins.
 */
export interface PluginThingAction extends ThingAction {
  /**
   * Gets a value indicating if this Action is owned by the plugin.
   *
   * Some operations on Actions can only be performed by the plugin that owns them.
   */
  isOwned(): this is OwnedPluginThingAction;

  /**
   * Gets the public API representation of this Action.
   */
  toAction(): ThingAction;
}

/**
 * Describes capabilities of a Plugin Action that are only available to a plugin that owns the Action.
 */
export interface OwnedPluginThingAction extends PluginThingAction {
  /**
   * Add an Action Request to the action.
   *
   * This can be used to fill in requests performed out of channel.
   *
   * This call is not needed for {@link ThingActionDef#onActionInvocationRequested}, as that callback
   * handles the creation of requests on your behalf.
   *
   * @param def The definition of the action request to add.
   * @returns A ThingActionRequest instance representing the created request.
   */
  addRequest(def: ThingActionRequestDef): ThingActionRequest;
}
