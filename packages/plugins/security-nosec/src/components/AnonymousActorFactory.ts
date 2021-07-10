import { Context } from "microinject";
import { Actor, PluginThingsManager } from "@wutwot/core";

export const AnonymousActor = Symbol.for(
  "https://github.com/robophred/wutwot#security-nosec:AnonymousActor",
);
export function anonymousActorFactory(
  context: Context,
  thingsManager: PluginThingsManager,
): Actor {
  return thingsManager
    .addThing({
      pluginLocalId: "anonymous",
      title: "Anonymous",
      description: `Anonymous user for "nosec" security.`,
    })
    .toThing();
}