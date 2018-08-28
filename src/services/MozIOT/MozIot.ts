import { Container } from "microinject";

import { MozIotPlugin } from "./plugin-management";

import mozIotModule from "./module";

export class MozIot {
  private readonly _container: Container;

  constructor() {
    this._container = new Container();
    this._container.load(mozIotModule);
  }

  registerPlugin(plugin: MozIotPlugin) {}
}
