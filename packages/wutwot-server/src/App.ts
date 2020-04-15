import { Container } from "microinject";
import { MozIot } from "@wutwot/core";

import appModule from "./module";

import { Entrypoint, Shutdownable } from "./contracts";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.bind(App).toConstantValue(this);
    this._container.load(appModule);
  }

  run() {
    if (this._container.has(Entrypoint)) {
      const entrypoints = this._container.getAll(Entrypoint);
      entrypoints.forEach((x) => x.start());
    }
  }

  async shutdown() {
    if (this._container.has(Shutdownable)) {
      this._container.getAll(Shutdownable).forEach((x) => x.onShutdown());
    }
    await this._container.get(MozIot).shutdown();
  }
}
