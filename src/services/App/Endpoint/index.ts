import { injectable, inject, provides } from "microinject";

import { mapValues, has } from "lodash";

import HttpStatusCodes from "http-status-codes";

import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

import { MozIot, Thing } from "../../MozIot";

import { Entrypoint } from "../contracts";
import { ThingAction } from "../../MozIot/actions";

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
        return actionsRouter.url("get-action", {
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

    router.get("get-actions", `/`, (ctx, next) => {
      const thing = this._mozIoT.things.find(x => x.id === ctx.params.thingId);
      if (!thing) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      const body: any = {};
      for (const actionId in thing.actions) {
        const action = thing.actions[actionId];
        body[actionId] = this._getRestAction(action);
      }
      ctx.body = body;
      next();
    });

    router.get("get-action", `/:actionId`, (ctx, next) => {
      // Not defined by the spec.
      const { thingId, actionId } = ctx.params;

      const thing = this._mozIoT.things.find(x => x.id === thingId);
      if (!thing) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      if (!has(thing.actions, actionId)) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      const action = thing.actions[actionId];
      ctx.body = this._getRestAction(action);
      next();
    });

    router.post("post-action", `/:actionId`, (ctx, next) => {
      // Not defined by the spec.
      const { thingId, actionId } = ctx.params;

      const contentType = ctx.request.headers["content-type"];
      if (!contentType || !contentType.startsWith("application/json")) {
        ctx.throw(HttpStatusCodes.BAD_REQUEST);
        return;
      }

      const thing = this._mozIoT.things.find(x => x.id === thingId);
      if (!thing) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      if (!has(thing.actions, actionId)) {
        ctx.throw(HttpStatusCodes.NOT_FOUND);
        return;
      }

      const action = thing.actions[actionId];

      // TODO: Validate json against schema.
      //  Should probably do this in request executor.
      action.request(ctx.request.body);
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
}
