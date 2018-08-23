import { injectable, singleton, provides, inject } from "microinject";

import { ReadonlyRecord } from "../../../../types";

import { ThingRegistry } from "../../things";

import { MozIOT } from "../MozIOT";
import { ThingPluginManager } from "../../things/components";
import { Thing } from "../Thing";

@injectable()
@singleton()
@provides(MozIOT)
export class MozIOTImpl implements MozIOT {
  constructor(
    @inject(ThingPluginManager) private _thingPluginManager: ThingPluginManager,
    @inject(ThingRegistry) private _thingRegistry: ThingRegistry
  ) {
    _thingPluginManager.run();
  }

  get things(): ReadonlyRecord<string, Thing> {
    // TODO: Persistent map of ThingContext from _thingRegistry to Thing.
    throw new Error("Not Implemented");
  }
}
