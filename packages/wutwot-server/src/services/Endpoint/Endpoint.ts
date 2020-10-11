import express, { IRouter, Router } from "express";
import { injectable, provides, inject, singleton } from "microinject";
import nocache from "nocache";
import helmet from "helmet";
import cors from "cors";

import { Entrypoint } from "../../contracts";
import { Port, CorsOrigin } from "../../config";

@injectable()
@singleton()
@provides(Entrypoint)
export class Endpoint implements Entrypoint {
  private _router = Router();

  constructor(
    @inject(Port) private _port: number,
    @inject(CorsOrigin) private _corsOrigin: string,
  ) {}

  get router(): IRouter {
    return this._router;
  }

  start() {
    const app = express();
    app.use(
      nocache(),
      helmet(),
      cors({
        origin: this._corsOrigin,
      }),
    );

    app.use(this._router);
    app.listen(this._port, (err) => {
      if (err) {
        // TODO: log better
        console.error(err);
      }
    });
  }
}
