import express, {
  Router,
  IRouter,
  Request,
  Response,
  NextFunction,
} from "express";
import { hostname as getHostname } from "os";
import { isHttpError } from "http-errors";
import HttpStatusCodes from "http-status-codes";
import { ServiceLocator, BindFunction } from "microinject";
import { WutWotPlugin } from "@wutwot/core";
import { createControllerRoute } from "simply-express-controllers";

import { ExpressRouter, ExpressRootUrl } from "./services";
import { ExpressController } from "./contracts";

export type ExpressServientPluginOptions =
  | InternalExpressServientPluginOptions
  | ExternalExpressServientPluginOptions;
export interface CommonExpressServientPluginOptions {
  pluginId?: string;
}

export interface InternalExpressServientPluginOptions
  extends CommonExpressServientPluginOptions {
  hostname?: string;
  port?: number;
}

export interface ExternalExpressServientPluginOptions
  extends CommonExpressServientPluginOptions {
  rootUrl: string;
  router: IRouter;
}
function isExternalOptions(
  opts: ExpressServientPluginOptions,
): opts is ExternalExpressServientPluginOptions {
  return "router" in opts;
}

export class ExpressServientPlugin implements WutWotPlugin {
  private _pluginId: string;
  private _rootUrl: string;
  private _router: IRouter;

  constructor(opts: ExpressServientPluginOptions) {
    this._pluginId = opts.pluginId ?? "express-servient";

    if (isExternalOptions(opts)) {
      if (!opts.rootUrl) {
        throw new Error(
          "ExpressServientPlugin must be configured with a root url when used with an external express router.",
        );
      }
      this._router = opts.router;
      this._rootUrl = opts.rootUrl;
    } else {
      var server = express();
      server.on("error", (err) => {
        // TODO: Log error, better error handling.
        console.error(err);
      });

      this._router = Router();
      server.use(this._router);

      const configuredHostname = opts.hostname ?? process.env.HOSTNAME;

      const configuredPort = opts.port ?? Number(process.env.PORT);
      if (Number.isNaN(configuredPort)) {
        throw new Error("ExpressServientPlugin: No port configured.");
      }

      const portStr = configuredPort == 80 ? "" : `:${configuredPort}`;
      if (configuredHostname && configuredHostname != "") {
        this._rootUrl = `http://${configuredHostname}${portStr}`;
        // A specific hostname has been specified, so limit the host to it.
        server.listen(configuredPort, configuredHostname);
      } else {
        // Assume we are using the host's hostname.
        this._rootUrl = `http://${getHostname()}${portStr}`;
        // Don't limit the connections to the assumed hostname, however.
        server.listen(configuredPort);
      }

      server.use(
        (err: Error, req: Request, res: Response, next: NextFunction) => {
          // TODO: Log error

          if (isHttpError(err)) {
            const headers = err.headers ?? {};
            for (const header of Object.keys(headers)) {
              res.header(header, headers[header]);
            }
            // TODO: Use [problem detail](https://datatracker.ietf.org/doc/html/rfc7807).
            // This is requested by the Thing Discovery api.
            res.status(err.statusCode).end({
              message: err.message,
            });
          } else {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
          }
        },
      );
    }
  }

  get id(): string {
    return this._pluginId;
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(ExpressRouter).toConstantValue(this._router);
    bind(ExpressRootUrl).toConstantValue(this._rootUrl);
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    if (serviceLocator.has(ExpressController)) {
      const controllers = serviceLocator.getAll(ExpressController);
      const controllerRoute = createControllerRoute(...controllers);
      this._router.use(controllerRoute);
    }
  }
}
