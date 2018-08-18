import { injectable, inject, provides } from "microinject";

import { mapValues } from "lodash";

import Koa from "koa";
import Router from "koa-router";

import { Entrypoint } from "../../../contracts";

import { ThingManager, Thing } from "../../MozIOT";

@injectable()
@provides(Entrypoint)
export class EndpointImpl implements Entrypoint {
  private _app: Koa | undefined;

  constructor(@inject(ThingManager) private _thingManager: ThingManager) {}

  start(): void {
    this._app = new Koa();

    // const router = new Router();
    // applyRouter(router, this._createThingsRouter());
    const router = this._createThingsRouter();
    this._app.use(router.routes());
    this._app.use(router.allowedMethods());

    this._app.listen(8080);
  }

  private _createThingsRouter(): Router {
    const router = new Router({ prefix: "/things" });

    router.get("/", (ctx, next) => {
      ctx.body = this._thingManager.things.map(x => ({
        ...this._getRestThing(x),
        href: router.url("get-thing", x.id)
      }));
      next();
    });

    router.get("get-thing", "/:thingId", (ctx, next) => {
      const { thingId } = ctx.params;
      const thing = this._thingManager.things.find(x => x.id === thingId);
      if (!thing) {
        ctx.throw(404);
        next();
        return;
      }

      ctx.body = {
        ...this._getRestThing(thing),
        links: [
          {
            rel: "properties",
            href: `/things/${thing.id}/properties`
          },
          {
            rel: "actions",
            href: `/things/${thing.id}/actions`
          },
          {
            rel: "events",
            href: `/things/${thing.id}/events`
          }
        ]
      };
    });
    const propertiesRouter = this._createPropertiesRouter();
    router.use(
      `/:thingId/properties`,
      propertiesRouter.routes(),
      propertiesRouter.allowedMethods()
    );
    const actionsRouter = this._createActionsRouter();
    router.use(
      `/:thingId/actions`,
      actionsRouter.routes(),
      actionsRouter.allowedMethods()
    );
    const eventsRouter = this._createEventsRouter();
    router.use(
      `/:thingId/events`,
      eventsRouter.routes(),
      eventsRouter.allowedMethods()
    );

    return router;
  }

  private _createPropertiesRouter(): Router {
    // TODO:
    return new Router({});
  }

  private _createActionsRouter(): Router {
    // TODO
    return new Router();
  }

  private _createEventsRouter(): Router {
    // TODO
    return new Router();
  }

  private _getRestThing(thing: Thing) {
    return {
      name: thing.name,
      description: thing.description,
      properties: {},
      actions: mapValues(thing.actions, action => ({
        label: action.label,
        description: action.description,
        input: action.input,
        href: `/things/${thing.id}/actions/${action.id}`
      })),
      events: {}
    };
  }
}