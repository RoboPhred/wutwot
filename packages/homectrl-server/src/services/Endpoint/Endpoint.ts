import express from "express";
import { injectable, provides, inject } from "microinject";
import nocache from "nocache";
import helmet from "helmet";
import cors from "cors";

import { Entrypoint } from "../../contracts";
import { Port, CorsOrigin } from "../../config";

import { Controller } from "./infrastructure/services";
import { createControllerRouter } from "./infrastructure/methods";

@injectable()
@provides(Entrypoint)
export class Endpoint implements Entrypoint {
  constructor(
    @inject(Port) private _port: number,
    @inject(CorsOrigin) private _corsOrigin: string,
    @inject(Controller, { all: true }) private _controllers: Controller[]
  ) {}

  start() {
    const app = express();
    app.use(
      nocache(),
      helmet(),
      cors({
        origin: this._corsOrigin
      })
    );

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
