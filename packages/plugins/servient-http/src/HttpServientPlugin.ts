import https from "https";
import fs from "fs";
import { createHash } from "crypto";
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
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { pki } from "node-forge";

import { HttpRouter, HttpRootUrl } from "./services";
import { HttpController } from "./contracts";

export type HttpServientPluginOptions =
  | InternalHttpServientPluginOptions
  | ExternalHttpServientPluginOptions;
export interface CommonHttpServientPluginOptions {
  pluginId?: string;
}

export interface InternalHttpServientPluginOptions
  extends CommonHttpServientPluginOptions {
  hostname?: string;
  port?: number;
  certificate: string;
  privateKey: string;
}

export interface ExternalHttpServientPluginOptions
  extends CommonHttpServientPluginOptions {
  rootUrl: string;
  router: IRouter;
}
function isExternalOptions(
  opts: HttpServientPluginOptions,
): opts is ExternalHttpServientPluginOptions {
  return "router" in opts;
}

export class ExpressServientPlugin implements WutWotPlugin {
  private _pluginId: string;
  private _rootUrl: string;
  private _router: IRouter;

  constructor(opts: HttpServientPluginOptions) {
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
      const [generatedUrl, generatedRouter] = this._configureInternal(opts);
      this._rootUrl = generatedUrl;
      this._router = generatedRouter;
    }
  }

  get id(): string {
    return this._pluginId;
  }

  onRegisterPublicServices(bind: BindFunction) {
    bind(HttpRouter).toConstantValue(this._router);
    bind(HttpRootUrl).toConstantValue(this._rootUrl);
  }

  onPluginInitialize(serviceLocator: ServiceLocator) {
    if (serviceLocator.has(HttpController)) {
      const controllers = serviceLocator.getAll(HttpController);
      const controllerRoute = createControllerRoute(...controllers);
      this._router.use(controllerRoute);
    }
  }

  private _configureInternal(
    opts: InternalHttpServientPluginOptions,
  ): [string, Router] {
    let router: Router = Router();
    let rootUrl: string;
    let bindPort: number;
    let bindHostname: string | null = null;

    const configuredHostname = opts.hostname ?? process.env.HOSTNAME;

    const configuredPort = opts.port ?? Number(process.env.PORT);
    if (Number.isNaN(configuredPort)) {
      throw new Error("ExpressServientPlugin: No port configured.");
    }

    const portStr = configuredPort == 80 ? "" : `:${configuredPort}`;
    if (configuredHostname && configuredHostname != "") {
      rootUrl = `https://${configuredHostname}${portStr}`;
      // A specific hostname has been specified, so limit the host to it.
      bindPort = configuredPort;
      bindHostname = configuredHostname;
    } else {
      // Assume we are using the host's hostname.
      rootUrl = `https://${getHostname()}${portStr}`;
      // Don't limit the connections to the assumed hostname, however.
      bindPort = configuredPort;
    }

    var app = express();
    app.use(cookieParser());
    app.use(helmet());

    app.on("error", (err) => {
      // TODO: Log error, better error handling.
      console.error(err);
    });

    app.use(router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      // TODO: Log error

      if (isHttpError(err)) {
        const headers = err.headers ?? {};
        for (const header of Object.keys(headers)) {
          res.header(header, headers[header]);
        }
        // TODO: Use [problem detail](https://datatracker.ietf.org/doc/html/rfc7807).
        // This is requested by the Thing Discovery api.
        res.status(err.statusCode).send({
          message: err.message,
        });
      } else {
        console.error(err);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
      }
    });

    const [cert, key] = this._loadCertificate(
      opts,
      bindHostname ?? getHostname(),
    );

    const server = https.createServer({ key, cert }, app);

    server.listen(configuredPort, configuredHostname);

    return [rootUrl, router];
  }

  private _loadCertificate(
    opts: InternalHttpServientPluginOptions,
    hostname: string,
  ): [certificate: string | Buffer, privateKey: string | Buffer] {
    const { certificate, privateKey } = opts;
    if (certificate || privateKey) {
      if (isNullOrEmpty(certificate) || isNullOrEmpty(privateKey)) {
        throw new Error(
          "Both the certificate and the private key must be specified.",
        );
      }

      const cert = fs.readFileSync(certificate);
      const pk = fs.readFileSync(privateKey);
      return [cert, pk];
    } else {
      return this._generateCertificate(hostname);
    }
  }

  _generateCertificate(
    hostname: string,
  ): [certificate: string, privateKey: string] {
    const keyPair = pki.rsa.generateKeyPair(2048);

    const cert = pki.createCertificate();
    cert.publicKey = keyPair.publicKey;
    cert.serialNumber = createHash("sha1")
      .update(hostname + Date.now())
      .digest("hex");

    const fullYear = new Date().getFullYear();
    cert.validity.notBefore = new Date();
    cert.validity.notBefore.setFullYear(fullYear - 1);
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setFullYear(
      cert.validity.notBefore.getFullYear() + 1,
    );

    cert.setSubject([
      {
        shortName: "O",
        value: "Self-Signed Certificate for WutWot",
      },
      {
        shortName: "CN",
        value: hostname,
      },
    ]);

    cert.setIssuer([
      {
        shortName: "C",
        value: "US",
      },
      {
        shortName: "ST",
        value: "New York",
      },
      {
        shortName: "L",
        value: "New York",
      },
      {
        shortName: "O",
        value: "Self-Signed Certificate for WutWot",
      },
      {
        shortName: "CN",
        value: hostname,
      },
    ]);

    cert.setExtensions([
      {
        name: "basicConstraints",
        critical: true,
        value: "CA:FALSE",
      },
      {
        name: "keyUsage",
        critical: true,
        value: "digitalSignature",
      },
      {
        name: "extKeyUsage",
        critical: true,
        value: "serverAuth",
      },
      {
        name: "subjectAltName",
        critical: false,
        value: `DNS:${hostname}`,
      },
    ]);

    cert.sign(keyPair.privateKey);

    return [
      pki.certificateToPem(cert),
      pki.privateKeyToPem(keyPair.privateKey),
    ];
  }
}

function isNullOrEmpty(str: string): boolean {
  return str == null || str == "";
}
