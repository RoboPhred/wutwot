import { Container } from "microinject";

import appModule from "./module";

import { Entrypoint } from "./contracts";
import { RootURL, Port, CorsOrigin } from "./config";

import { ZWavePort } from "./services/ZWavePlugin";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.bind(RootURL).toConstantValue("http://localhost:8080");
    this._container.bind(Port).toConstantValue(8080);
    this._container.bind(CorsOrigin).toConstantValue("*");

    this._container.load(appModule);

    if (process.env.HOMECTRL_ZWAVE_PORT) {
      console.log("Z-Wave port is configured");
      this._container
        .bind(ZWavePort)
        .toConstantValue(process.env.HOMECTRL_ZWAVE_PORT);
    } else {
      console.log("No port is configured");
    }
  }

  run() {
    const entrypoints = this._container.getAll(Entrypoint);
    entrypoints.forEach(x => x.start());
  }
}
