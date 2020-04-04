import { Container } from "microinject";
import { inspect, InspectOptionsStylized } from "util";

import containerModule from "./module";

import { Thing, ThingsManager } from "./components/things";
import { PluginManager, MozIotPlugin } from "./components/plugin-management";
import { Initializable } from "./contracts";

export class MozIot {
  private _container: Container = new Container();
  private _pluginManager: PluginManager;
  private _thingManager: ThingsManager;

  constructor(plugins: MozIotPlugin[]) {
    this._container.bind(Container).toConstantValue(this._container);
    this._container.load(containerModule);

    this._pluginManager = this._container.get(PluginManager);
    this._thingManager = this._container.get(ThingsManager);

    for (const plugin of plugins) {
      this._pluginManager.registerPlugin(plugin);
    }

    this._container
      .getAll(Initializable)
      .forEach(initializable => initializable.initialize());
  }

  [inspect.custom](depth: number, options: InspectOptionsStylized) {
    if (depth < 0) {
      return options.stylize("[MozIot]", "special");
    }

    const newOptions = Object.assign({}, options, {
      depth: options.depth == null ? null : options.depth - 1
    });

    const padding = " ".repeat(2);
    const inner = inspect(this.toJSON(), newOptions).replace(
      /\n/g,
      `\n${padding}`
    );
    return `MozIot ${inner}`;
  }

  // TODO: Should be live instance Record<thingId, Thing>
  get things(): ReadonlyArray<Thing> {
    return this._thingManager.getThings().map(thing => thing.publicProxy);
  }

  toJSON() {
    return {
      things: this.things.map(thing => thing.toJSON())
    };
  }
}
