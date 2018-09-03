"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const microinject_1 = require("microinject");
const lodash_1 = require("lodash");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const MozIot_1 = require("../../MozIot");
const contracts_1 = require("../contracts");
let Endpoint = class Endpoint {
    constructor(_mozIoT) {
        this._mozIoT = _mozIoT;
    }
    start() {
        this._app = new koa_1.default();
        this._app.use(koa_bodyparser_1.default());
        const actionsRouter = this._createActionsRouter();
        const actionUrlFactory = (thingId, actionId) => {
            if (actionId) {
                return actionsRouter.url("get-requests", {
                    thingId,
                    actionId
                });
            }
            else {
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
    _createThingsRouter(actionUrlFactory) {
        const router = new koa_router_1.default({ prefix: "/things" });
        router.get("/", (ctx, next) => {
            ctx.body = this._mozIoT.things.map(x => (Object.assign({}, this._getRestThing(x, actionUrlFactory), { href: router.url("get-thing", { thingId: x.id }) })));
            next();
        });
        router.get("get-thing", "/:thingId", (ctx, next) => {
            const { thingId } = ctx.params;
            const thing = this._mozIoT.things.find(x => x.id === thingId);
            if (!thing) {
                ctx.throw(http_status_codes_1.default.NOT_FOUND);
                return;
            }
            ctx.body = Object.assign({}, this._getRestThing(thing, actionUrlFactory), { links: [
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
                ] });
        });
        return router;
    }
    _createPropertiesRouter() {
        // TODO:
        return new koa_router_1.default({ prefix: "/things/:thingId/properties" });
    }
    _createActionsRouter() {
        const router = new koa_router_1.default({ prefix: "/things/:thingId/actions" });
        const getThing = (ctx) => {
            const thingId = ctx.params.thingId;
            const thing = this._mozIoT.things.find(x => x.id === thingId);
            if (!thing) {
                return ctx.throw(http_status_codes_1.default.NOT_FOUND);
            }
            return thing;
        };
        const getAction = (ctx) => {
            const thing = getThing(ctx);
            const actionId = ctx.params.actionId;
            if (!lodash_1.has(thing.actions, actionId)) {
                return ctx.throw(http_status_codes_1.default.NOT_FOUND);
            }
            const action = thing.actions[actionId];
            return action;
        };
        router.get("get-actions", `/`, (ctx, next) => {
            const thing = getThing(ctx);
            const body = {};
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
                [x.id]: Object.assign({}, this._getRestActionRequest(x), { href: router.url("get-request", {
                        thingId,
                        actionId,
                        requestId: x.id
                    }) })
            }));
            next();
        });
        router.post("post-action", `/:actionId`, (ctx, next) => {
            const contentType = ctx.request.headers["content-type"];
            if (!contentType || !contentType.startsWith("application/json")) {
                ctx.throw(http_status_codes_1.default.BAD_REQUEST);
                return;
            }
            const { thingId, actionId } = ctx.params;
            const action = getAction(ctx);
            // TODO: Validate json against schema.
            //  Should probably do this in request executor.
            const request = action.request(ctx.request.body);
            ctx.body = Object.assign({}, this._getRestActionRequest(request), { href: router.url("get-request", {
                    thingId,
                    actionId,
                    requestId: request.id
                }) });
            ctx.status = http_status_codes_1.default.CREATED;
            next();
        });
        router.get("get-request", `/:actionId/:requestId`, (ctx, next) => {
            const action = getAction(ctx);
            const { thingId, actionId, requestId } = ctx.params;
            const request = action.requests.find(x => x.id === requestId);
            if (!request) {
                return ctx.throw(http_status_codes_1.default.NOT_FOUND);
            }
            ctx.body = Object.assign({}, this._getRestActionRequest(request), { href: router.url("get-request", {
                    thingId,
                    actionId,
                    requestId: request.id
                }) });
        });
        return router;
    }
    _createEventsRouter() {
        // TODO
        return new koa_router_1.default({ prefix: "/things/:thingId/events" });
    }
    _getRestThing(thing, actionUrlFactory) {
        return {
            name: thing.name,
            "@types": thing.types,
            description: thing.description,
            properties: {},
            actions: lodash_1.mapValues(thing.actions, action => ({
                label: action.label,
                description: action.description,
                input: action.input,
                href: actionUrlFactory(thing.id, action.id)
            })),
            events: {}
        };
    }
    _getRestAction(action) {
        // This is not yet defined by the spec.
        return {
            label: action.label,
            description: action.description,
            input: action.input
        };
    }
    _getRestActionRequest(request) {
        return {
            input: request.input,
            status: request.status,
            timeRequested: request.timeRequested,
            timeCompleted: request.timeCompleted || undefined
        };
    }
};
Endpoint = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(contracts_1.Entrypoint),
    __param(0, microinject_1.inject(MozIot_1.MozIot))
], Endpoint);
exports.Endpoint = Endpoint;
//# sourceMappingURL=index.js.map