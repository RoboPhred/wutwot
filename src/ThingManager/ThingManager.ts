import { ThingDef } from "./ThingDefinition";

/**
 * Provides aggregate Thing manipulation.
 *
 * Aggregates things from all registered ThingProviders
 */
export interface ThingManager {
  /**
   * Gets all things known to the server.
   *  In general, this is all things from ThingProviders proxied with their IDs
   *  prefixed by the ThingProvider ID.
   *
   * These things will have the actions/events/properties middleware additions applied.
   */
  getThings(): Thing[];

  on(event: "thing-added", handler: (ev: { thing: Thing }) => void): void;
  on(event: "thing-removed", handler: (ev: { thing: Thing }) => void): void;
}

/**
 * Converts a managed Thing object into a RESTful json
 * object ready for consumption by the REST api.
 */
// TODO: Keep rest translation seperate from Thing logic.
//  Something like below?
// export interface RestThingAdapter {
//   /**
//    * Converts a thing into a restful path and GET object.
//    * @param thing The thing to convert.
//    */
//   toRest(thing: Thing): { def: ThingDef; path: string };
//   handleRequest(
//     thing: Thing,
//     method: string,
//     thingPath: string,
//     body: any
//   ): Promise<{ statusCode: number; statusMessage: string; body: any }>;
// }

// Need sources for actions, props, events, both top level and per-thing.
//  Need middleware for attaching custom actions/props/events to things.
// Example: zwave-battery-tracker checks zwave devices for official battery
//  descriptor, reports a prop for it, and emits events on battery low.

/**
 * A source of Things.
 * There is no middleware for adding things to thing providers,
 *  as the plugin should just introduce another ThingProvider.
 */
export interface ThingProvider {
  // The identity of this thing provider.
  readonly id: string;

  // Gets all things from this provider.
  //  Things do not include any actios/events/properties from middleware.
  getThings(): Thing[];

  // TODO: Should be 'anonymous things' with optional name and required id.
  //  ThingManager will prefix the id with the id of the ThingProvider
  //  to disambiguate them.
  // Name may be used by default on thing added, and can be overridden by user.
  on(event: "thing-added", handler: (ev: { thing: Thing }) => void): void;
  on(event: "thing-removed", handler: (ev: { thing: Thing }) => void): void;
}

export interface Thing {
  // Needs to provide a consistent id, as name is user-facing and can clash
  //  with multiple providers.
  //  This id sould not be revealed through the public api
  readonly id: string;

  // User-facing name.  Editable
  name: string;

  // actions, events, properties
  // Set up all 3 so middleware can provide additional
  //  actions / events / props on arbitrary things.
}
