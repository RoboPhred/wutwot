import { injectable, inject, provides } from "microinject";

import { mapValues, has } from "lodash";

import HttpStatusCodes from "http-status-codes";

import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import { MozIot, Thing } from "../../MozIot";

import { Entrypoint } from "../contracts";
import { ThingAction } from "../../MozIot/actions";
import { ThingActionRequest } from "../../MozIot/action-requests";

@injectable()
@provides(Entrypoint)
export class Endpoint implements Entrypoint {
  private _app: Koa | undefined;

  constructor(@inject(MozIot) private _mozIoT: MozIot) {}

  start(): void {
    this._app = new Koa();
    this._app.use(bodyParser());

    const actionsRouter = this._createActionsRouter();
    const actionUrlFactory = (thingId: string, actionId?: string) => {
      if (actionId) {
        return actionsRouter.url("get-requests", {
          thingId,
          actionId
        });
      } else {
        return actionsRouter.url("get-actions", {
          thingId
        });
      }
    };
    this._app.use(actionsRouter.routes());
    this._app.use(actionsRouter.allowedMethods());

    const propertiesRouter = this._createPropertiesRouter();
    this._app.use(propertiesRouter.routes());
    this._app.use(propertiesRouter.allowedMethods());

    const eventsRouter = this._createEventsRouter();
    this._app.use(eventsRouter.routes());
    this._app.use(eventsRouter.allowedMethods());

    const thingsRouter = this._createThingsRouter(actionUrlFactory);
    this._app.use(thingsRouter.routes());
    this._app.use(thingsRouter.allowedMethods());

    this._app.listen(8080);
  }

  private _createThingsRouter(
    actionUrlFactory: (thingId: string, actionId?: string) => string
  ): Router {
    const router = new Router({ prefix: "/things" });

    router.get("/", (ctx, next) => {
      ctx.body = this._mozIoT.things.map(x => ({
        ...this._getRestThing(x, actionUrlFactory),
        href: router.url("get-thing", { thingId: x.id })
      }));
      next();
    });

    router.get("get-thing", "/:thingId", (ctx, next) => {
      const { thingId } = ctx.params;
      const thing = this._mozIoT.things.find(x => x.id === thingId);
      if (!thing) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      ctx.body = {
        ...this._getRestThing(thing, actionUrlFactory),
        links: [
          {
            rel: "properties",
            href: `/things/${thing.id}/properties`
          },
          {
            rel: "actions",
            href: actionUrlFactory(thing.id)
          },
          {
            rel: "events",
            href: `/things/${thing.id}/events`
          }
        ]
      };
    });

    return router;
  }

  private _createPropertiesRouter(): Router {
    // TODO:
    return new Router({ prefix: "/things/:thingId/properties" });
  }

  private _createActionsRouter(): Router {
    const router = new Router({ prefix: "/things/:thingId/actions" });

    const getThing = (ctx: Router.IRouterContext): Thing => {
      const thingId = ctx.params.thingId;
      const thing = this._mozIoT.things.find(x => x.id === thingId);
      if (!thing) {
        return ctx.throw(HttpStatusCodes.NOT_FOUND);
      }

      return thing;
    };

    const getAction = (ctx: Router.IRouterContext): ThingAction => {
      const thing = getThing(ctx);

      const actionId = ctx.params.actionId;
      if (!has(thing.actions, actionId)) {
        return ctx.throw(HttpStatusCodes.NOT_FOUND);
      }

      const action = thing.actions[actionId];
      return action;
    };

    router.get("get-actions", `/`, (ctx, next) => {
      const thing = getThing(ctx);

      const body: any = {};
      for (const actionId in thing.actions) {
        const action = thing.actions[actionId];
        body[actionId] = this._getRestAction(action);
      }
      ctx.body = body;
      next();
    });

    router.get("get-requests", `/:actionId`, (ctx, next) => {
      const { thingId, actionId } = ctx.params;

      const action = getAction(ctx);

      ctx.body = action.requests.map(x => ({
        [x.id]: {
          ...this._getRestActionRequest(x),
          href: router.url("get-request", {
            thingId,
            actionId,
            requestId: x.id
          })
        }
      }));
      next();
    });

    router.post("post-action", `/:actionId`, (ctx, next) => {
      const contentType = ctx.request.headers["content-type"];
      if (!contentType || !contentType.startsWith("application/json")) {
        ctx.throw(HttpStatusCodes.BAD_REQUEST);
        return;
      }

      const { thingId, actionId } = ctx.params;

      const action = getAction(ctx);

      // TODO: Validate json against schema.
      //  Should probably do this in request executor.
      const request = action.request(ctx.request.body);
      ctx.body = {
        ...this._getRestActionRequest(request),
        href: router.url("get-request", {
          thingId,
          actionId,
          requestId: request.id
        })
      };
      ctx.status = HttpStatusCodes.CREATED;
      next();
    });

    router.get("get-request", `/:actionId/:requestId`, (ctx, next) => {
      const action = getAction(ctx);

      const { thingId, actionId, requestId } = ctx.params;

      const request = action.requests.find(x => x.id === requestId);

      if (!request) {
        return ctx.throw(HttpStatusCodes.NOT_FOUND);
      }

      ctx.body = {
        ...this._getRestActionRequest(request),
        href: router.url("get-request", {
          thingId,
          actionId,
          requestId: request.id
        })
      };
    });

    return router;
  }

  private _createEventsRouter(): Router {
    // TODO
    return new Router({ prefix: "/things/:thingId/events" });
  }

  private _getRestThing(
    thing: Thing,
    actionUrlFactory: (thingId: string, actionId: string) => string
  ) {
    return {
      name: thing.name,
      "@types": thing.types,
      description: thing.description,
      properties: {},
      actions: mapValues(thing.actions, action => ({
        label: action.label,
        description: action.description,
        input: action.input,
        href: actionUrlFactory(thing.id, action.id)
      })),
      events: {}
    };
  }

  private _getRestAction(action: ThingAction) {
    // This is not yet defined by the spec.
    return {
      label: action.label,
      description: action.description,
      input: action.input
    };
  }

  private _getRestActionRequest(request: ThingActionRequest) {
    return {
      input: request.input,
      status: request.status,
      timeRequested: request.timeRequested,
      timeCompleted: request.timeCompleted || undefined
    };
  }
}
