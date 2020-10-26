import express, {
  IRouter,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { injectable, provides, inject, singleton } from "microinject";
import nocache from "nocache";
import helmet from "helmet";
import cors from "cors";
import HttpStatusCodes from "http-status-codes";
import { HttpError } from "http-errors";

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

    app.use(
      (
        err: Error | HttpError,
        req: Request,
        resp: Response,
        next: NextFunction,
      ) => {
        if (isHttpError(err) && err.expose) {
          resp.statusMessage = err.message;
          resp.status(err.status).end();
        } else {
          console.error(err);
          resp.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
      },
    );
    app.listen(this._port, (err) => {
      if (err) {
        // TODO: log better
        console.error(err);
      }
    });
  }
}

function isHttpError(err: Error): err is HttpError {
  const anyError = err as any;
  return (
    typeof anyError.expose === "boolean" && typeof anyError.status === "number"
  );
}
