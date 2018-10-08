import { Container } from "microinject";

import { MozIotPlugin } from "./plugin-management";
import { PluginManager } from "./plugin-management/components/PluginManager";

import mozIotModule from "./module";

import { ThingRegistry } from "./things/components";
import { Thing } from "./things";

export class MozIot {
  private readonly _container: Container;

  constructor() {
    this._container = new Container();
    this._container.load(mozIotModule);
  }

  get things(): ReadonlyArray<Thing> {
    const registry = this._container.get(ThingRegistry);
    return Object.seal(Array.from(registry));
  }

  registerPlugin(plugin: MozIotPlugin) {
    this._container.get(PluginManager).registerPlugin(plugin);
  }
}
