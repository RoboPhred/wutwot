import {
  Router,
  Request,
  RequestHandler,
  Response,
  NextFunction,
} from "express";
import { forEach } from "lodash";
import HttpStatusCodes from "http-status-codes";
import bodyParser from "body-parser";

import { Controller } from "./services";
import { ControllerMethodMetadata, ControllerMetadata } from "./decorators";
import { ControllerMethodsMetadataKey, ControllerMetadataKey } from "./symbols";

export function createControllerRouter(controller: Controller): Router {
  const methodsMetadata = (controller as any)[ControllerMethodsMetadataKey];

  const router = Router();
  router.use(bodyParser.json());

  forEach(methodsMetadata, (metadata, key) =>
    createControllerMethod(router, controller, key, metadata),
  );

  return router;
}

function createControllerMethod(
  router: Router,
  controller: Controller,
  propertyName: string,
  methodMetadata: ControllerMethodMetadata,
): Router {
  const controllerMetadata: ControllerMetadata = (controller.constructor as any)[
    ControllerMetadataKey
  ];
  const handler = createControllerMethodHandler(
    controller,
    propertyName,
    methodMetadata,
  );
  switch (methodMetadata.method) {
    case "get":
      router.get(controllerMetadata.path, handler);
      break;
    case "post":
      router.post(controllerMetadata.path, handler);
      break;
    case "put":
      router.put(controllerMetadata.path, handler);
      break;
    default:
      throw new Error(
        `Unhandled controller route method type "${methodMetadata.method}".`,
      );
  }
  return router;
}

function createControllerMethodHandler(
  controller: Controller,
  propertyName: string,
  metadata: ControllerMethodMetadata,
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args = getControllerMethodHandlerArgs(req, res, metadata);
      let body = (controller as any)[propertyName].apply(controller, args);
      if (body && typeof body === "object" && typeof body.then === "function") {
        body = await body;
      }
      res.setHeader("Content-Type", "application/json");
      res.status(metadata.status || HttpStatusCodes.OK).send(body);
    } catch (e) {
      // TODO log better
      console.error(e);
      next(e);
    }
  };
}

function getControllerMethodHandlerArgs(
  req: Request,
  res: Response,
  metadata: ControllerMethodMetadata,
): any[] {
  return (metadata.args || []).map((arg) => {
    if (arg.param) {
      return req.params[arg.param];
    }
    if (arg.body) {
      return req.body;
    }
    return undefined;
  });
}
