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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const contracts_1 = require("../../../contracts");
const MozIOT_1 = require("../../MozIOT");
let EndpointImpl = class EndpointImpl {
    constructor(_mozIoT) {
        this._mozIoT = _mozIoT;
    }
    start() {
        this._app = new koa_1.default();
        // const router = new Router();
        // applyRouter(router, this._createThingsRouter());
        const router = this._createThingsRouter();
        this._app.use(router.routes());
        this._app.use(router.allowedMethods());
        this._app.listen(8080);
    }
    _createThingsRouter() {
        const router = new koa_router_1.default({ prefix: "/things" });
        router.get("/", (ctx, next) => {
            ctx.body = Array.from(this._mozIoT.things.values()).map(x => (Object.assign({}, this._getRestThing(x), { href: router.url("get-thing", x.id) })));
            next();
        });
        router.get("get-thing", "/:thingId", (ctx, next) => {
            const { thingId } = ctx.params;
            const thing = this._mozIoT.things.get(thingId);
            if (!thing) {
                ctx.throw(404);
                next();
                return;
            }
            ctx.body = Object.assign({}, this._getRestThing(thing), { links: [
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
                ] });
        });
        const propertiesRouter = this._createPropertiesRouter();
        router.use(`/:thingId/properties`, propertiesRouter.routes(), propertiesRouter.allowedMethods());
        const actionsRouter = this._createActionsRouter();
        router.use(`/:thingId/actions`, actionsRouter.routes(), actionsRouter.allowedMethods());
        const eventsRouter = this._createEventsRouter();
        router.use(`/:thingId/events`, eventsRouter.routes(), eventsRouter.allowedMethods());
        return router;
    }
    _createPropertiesRouter() {
        // TODO:
        return new koa_router_1.default({});
    }
    _createActionsRouter() {
        // TODO
        return new koa_router_1.default();
    }
    _createEventsRouter() {
        // TODO
        return new koa_router_1.default();
    }
    _getRestThing(thing) {
        return {
            name: thing.name,
            description: thing.description,
            properties: {},
            actions: lodash_1.mapValues(thing.actions, action => ({
                label: action.label,
                description: action.description,
                input: action.input,
                href: `/things/${thing.id}/actions/${action.id}`
            })),
            events: {}
        };
    }
};
EndpointImpl = __decorate([
    microinject_1.injectable(),
    microinject_1.provides(contracts_1.Entrypoint),
    __param(0, microinject_1.inject(MozIOT_1.MozIOT))
], EndpointImpl);
exports.EndpointImpl = EndpointImpl;
//# sourceMappingURL=EndpointImpl.js.map