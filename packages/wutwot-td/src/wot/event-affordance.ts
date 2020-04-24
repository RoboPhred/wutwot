import { TypedDataSchema } from "./data-schema";
import { InteractionAffordance } from "./interaction-affordance";

/**
 * An Interaction Affordance that describes an event source, which asynchronously pushes event data to Consumers (e.g., overheating alerts).
 * {@link https://w3c.github.io/wot-thing-description/#eventaffordance}
 */
export interface EventAffordance extends InteractionAffordance {
  /**
   * Defines data that needs to be passed upon subscription, e.g., filters or message format for setting up Webhooks.
   */
  subscription?: TypedDataSchema;

  /**
   * Defines the data schema of the Event instance messages pushed by the Thing.
   */
  data?: TypedDataSchema;

  /**
   * Defines any data that needs to be passed to cancel a subscription, e.g., a specific message to remove a Webhook.
   */
  cancellation?: TypedDataSchema;
}
