import { Context } from "microinject";
import { Actor, PluginThingsManager } from "@wutwot/core";

export const AnonymousActor = Symbol.for(
  "https://github.com/robophred/wutwot#security-nosec:AnonymousActor",
);
export function anonymousActorFactory(context: Context): Actor {
  const pluginThingManager = context.get(PluginThingsManager);

  return pluginThingManager
    .addThing({
      pluginLocalId: "anonymous",
      title: "Anonymous",
      description: `Anonymous user for "nosec" security.`,
    })
    .toThing();
}
