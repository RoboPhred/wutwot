import { Container } from "microinject";

import { MozIot } from "homectrl-moziot";
import { TestPlugin } from "homectrl-plugin-test";
import zwaveModule from "homectrl-plugin-zwave";

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

    this._container.get(MozIot).registerPlugin(new TestPlugin());
  }

  run() {
    const repl = this._container.getAll(Entrypoint);
    repl.forEach(x => x.start());
  }
}
