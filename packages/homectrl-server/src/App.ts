import { Container } from "microinject";

import appModule from "./module";

import { Entrypoint } from "./contracts";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.load(appModule);
  }

  run() {
    const entrypoints = this._container.getAll(Entrypoint);
    entrypoints.forEach(x => x.start());
  }
}
