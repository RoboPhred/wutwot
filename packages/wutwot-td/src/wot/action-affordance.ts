import { DataSchema } from "./data-schema";
import { InteractionAffordance } from "./interaction-affordance";

/**
 * An Interaction Affordance that allows to invoke a function of the Thing, which manipulates state (e.g., toggling a lamp on or off) or triggers a process on the Thing (e.g., dim a lamp over time).
 * {@link https://w3c.github.io/wot-thing-description/#actionaffordance}.
 */
export interface ActionAffordance extends InteractionAffordance {
  /**
   * Used to define the input data schema of the Action.
   */
  input?: DataSchema;

  /**
   * Used to define the output data schema of the Action.
   */
  output?: DataSchema;

  /**
   * Signals if the Action is safe (=true) or not. Used to signal if there is no internal state (cf. resource state) is changed when invoking an Action. In that case responses can be cached as example.
   */
  safe?: boolean;

  /**
   * Indicates whether the Action is idempotent (=true) or not. Informs whether the Action can be called repeatedly with the same result, if present, based on the same input.
   */
  idempotent?: boolean;
}
