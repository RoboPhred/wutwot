import { Container } from "microinject";

import { MozIot, MozIotPlugin } from "homectrl-moziot";
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

    const mozIot = this._container.get(MozIot);
    mozIot.registerPlugin(new TestPlugin());

    const plugins = this._container.getAll(MozIotPlugin);
    plugins.forEach(plugin => mozIot.registerPlugin(plugin));
  }

  run() {
    const repl = this._container.getAll(Entrypoint);
    repl.forEach(x => x.start());
  }
}
