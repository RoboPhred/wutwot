import { Container } from "microinject";

import { MozIot, MozIotPlugin } from "homectrl-moziot";
import { TestPlugin } from "homectrl-plugin-test";
import zwaveModule, { ZWavePortConfig } from "homectrl-plugin-zwave";

import appModule from "./module";

import { Entrypoint } from "./contracts";
import { RootURL, Port, CorsOrigin } from "./config";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.load(appModule, zwaveModule);

    this._container.bind(RootURL).toConstantValue("http://localhost:8080");
    this._container.bind(Port).toConstantValue(8080);
    this._container.bind(CorsOrigin).toConstantValue("*");

    if (process.env.HOMECTRL_ZWAVE_PORT) {
      console.log("Z-Wave port is configured");
      this._container
        .bind(ZWavePortConfig)
        .toConstantValue(process.env.HOMECTRL_ZWAVE_PORT);
    } else {
      console.log("No port is configured");
    }

    const mozIot = this._container.get(MozIot);
    mozIot.registerPlugin(new TestPlugin());

    const plugins = this._container.getAll(MozIotPlugin);
    plugins.forEach(plugin => mozIot.registerPlugin(plugin));
  }

  run() {
    const entrypoints = this._container.getAll(Entrypoint);
    entrypoints.forEach(x => x.start());
  }
}
