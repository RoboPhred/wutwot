import {
  Router,
  Request,
  RequestHandler,
  Response,
  NextFunction
} from "express";
import { forEach } from "lodash";
import HttpStatusCodes from "http-status-codes";

import { Controller } from "./services";
import { ControllerMethodMetadata, ControllerMetadata } from "./decorators";
import { ControllerMethodsMetadataKey, ControllerMetadataKey } from "./symbols";

export function createControllerRouter(controller: Controller): Router {
  const methodsMetadata = (controller as any)[ControllerMethodsMetadataKey];

  const router = Router();

  forEach(methodsMetadata, (metadata, key) =>
    createControllerMethod(router, controller, key, metadata)
  );

  return router;
}

function createControllerMethod(
  router: Router,
  controller: Controller,
  propertyName: string,
  methodMetadata: ControllerMethodMetadata
): Router {
  const controllerMetadata: ControllerMetadata = (controller.constructor as any)[
    ControllerMetadataKey
  ];
  const handler = createControllerMethodHandler(
    controller,
    propertyName,
    methodMetadata
  );
  switch (methodMetadata.method) {
    case "get":
      router.get(controllerMetadata.path, handler);
      break;
    default:
      throw new Error(
        `Unhandled controller route method type "${methodMetadata.method}".`
      );
  }
  return router;
}

function createControllerMethodHandler(
  controller: Controller,
  propertyName: string,
  metadata: ControllerMethodMetadata
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const args = getControllerMethodHandlerArgs(req, res, metadata);
      const body = (controller as any)[propertyName].apply(controller, args);
      res.status(200).send(body);
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
  metadata: ControllerMethodMetadata
): any[] {
  return (metadata.args || []).map(arg => {
    if (arg.param) {
      return req.params[arg.param];
    }
    return undefined;
  });
}
