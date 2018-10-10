import { Container } from "microinject";

import appModule from "./module";

import { Entrypoint } from "./contracts";
import { MozIot } from "homectrl-moziot";
import { TestPlugin } from "homectrl-plugin-test";

export class App {
  private readonly _container = new Container();

  constructor() {
    this._container.load(appModule);

    this._container.get(MozIot).registerPlugin(new TestPlugin());
  }

  run() {
    const repl = this._container.getAll(Entrypoint);
    repl.forEach(x => x.start());
  }
}
