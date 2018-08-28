import { Container } from "microinject";

import appModule from "./module";

import { Entrypoint } from "./contracts";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.load(appModule);
  }

  run() {
    const repl = this._container.getAll(Entrypoint);
    repl.forEach(x => x.start());
  }
}
