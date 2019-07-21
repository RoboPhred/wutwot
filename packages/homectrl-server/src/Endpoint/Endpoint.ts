import express from "express";
import { injectable, provides, inject } from "microinject";
import helmet from "helmet";

import { Entrypoint } from "../contracts";
import { Port } from "../config";

import { Controller } from "./infrastructure/services";
import { createControllerRouter } from "./infrastructure/methods";

@injectable()
@provides(Entrypoint)
export class Endpoint implements Entrypoint {
  constructor(
    @inject(Port) private _port: number,
    @inject(Controller, { all: true }) private _controllers: Controller[]
  ) {}

  start() {
    const app = express();
    app.use(helmet());

    const routes = this._controllers.map(controller =>
      createControllerRouter(controller)
    );
    app.use(...routes);
    app.listen(this._port, err => {
      if (err) {
        // TODO: log better
        console.error(err);
      }
    });
  }
}
