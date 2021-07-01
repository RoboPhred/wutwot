import { provides, singleton, inject, injectable } from "microinject";
import {
  WutWot,
  Thing,
  SchemaValidationError,
  ActionInvocationError,
  PropertySetError,
} from "@wutwot/core";
import { HttpController, HttpRootUrl } from "@wutwot/plugin-servient-http";
import { Thing as TDThing, W3cWotTDContext } from "@wutwot/td";
import HttpStatusCodes from "http-status-codes";
import {
  controller,
  use,
  get,
  pathParam,
  body,
  put,
  post,
} from "simply-express-controllers";
import cors from "cors";
import nocache from "nocache";
import { compact } from "jsonld";
import createError from "http-errors";
import urlJoin from "url-join";

@injectable()
@singleton()
@provides(HttpController)
@controller("/things")
@use(cors({ origin: "*" }), nocache())
export class ThingDirectoryController {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(HttpRootUrl) private _rootUrl: HttpRootUrl,
  ) {}

  // TODO: Deprecate in favor of a plugin providing the [Thing Discovery API](https://www.w3.org/TR/wot-discovery/)
  @get("/", {
    description: "Gets an array of all thing descriptions",
    tags: ["Thing"],
  })
  async getThings() {
    const things = Array.from(this._wutwot.things.values());
    const tdPromises = things.map((thing) => this._getThingDefinition(thing));
    const tds = await Promise.all(tdPromises);
    return tds;
  }

  // TODO: Deprecate in favor of a plugin providing the [Thing Discovery API](https://www.w3.org/TR/wot-discovery/)
  @get("/:thingId", {
    description: "Gets a thing by its id",
    tags: ["Thing"],
  })
  async getThing(@pathParam("thingId") thingId: string) {
    const thing = this._wutwot.things.get(thingId);
    if (!thing) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Thing not found.");
    }
    const tdThing = await this._getThingDefinition(thing);
    return tdThing;
  }

  @get("/:thingId/properties/:propertyId", {
    description: "Gets the value of a thing property",
    tags: ["Thing", "Property"],
  })
  async getThingProperty(
    @pathParam("thingId") thingId: string,
    @pathParam("propertyId") propertyId: string,
  ) {
    const thing = this._wutwot.things.get(thingId);
    if (!thing) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Thing not found.");
    }
    const prop = thing.properties.get(propertyId);
    if (!prop) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Property not found.");
    }
    // Some properties can be undefined if their value is not known.
    return prop.value ?? null;
  }

  @put("/:thingId/properties/:propertyId", {
    description: "Sets the value of a thing property",
    tags: ["Thing", "Property"],
  })
  async setThingProperty(
    @pathParam("thingId") thingId: string,
    @pathParam("propertyId") propertyId: string,
    @body({ required: true }) value: any,
  ) {
    const thing = this._wutwot.things.get(thingId);
    if (!thing) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Thing not found.");
    }
    const prop = thing.properties.get(propertyId);
    if (!prop) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Property not found.");
    }

    try {
      await prop.setValue(value);
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        throw createError(
          HttpStatusCodes.BAD_REQUEST,
          "Body did not match the property schema.",
        );
      }
      if (e instanceof PropertySetError) {
        throw createError(
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
          `Failed to set value: ${e.message}`,
        );
      }
      throw e;
    }

    // Doesn't appear to be any contract for the response.
    return {};
  }

  @post("/:thingId/actions/:actionId", {
    description: "Invoke the action",
    tags: ["Thing", "Action"],
  })
  async executeThingAction(
    @pathParam("thingId") thingId: string,
    @pathParam("actionId") actionId: string,
    @body() input: any,
  ) {
    const thing = this._wutwot.things.get(thingId);
    if (!thing) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Thing not found.");
    }
    const action = thing.actions.get(actionId);
    if (!action) {
      throw createError(HttpStatusCodes.NOT_FOUND, "Action not found.");
    }

    try {
      const result = await action.invoke(input).toPromise();
      return result ?? null;
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        throw createError(HttpStatusCodes.BAD_REQUEST, e.message);
      }
      if (e instanceof ActionInvocationError) {
        throw createError(
          HttpStatusCodes.INTERNAL_SERVER_ERROR,
          `Failed to invoke action: ${e.message}`,
        );
      }

      throw e;
    }
  }

  private async _getThingDefinition(thing: Thing): Promise<TDThing> {
    try {
      const ld = thing.toJSONLD();
      // jsonld typings are wrong: compact accepts a url for context.
      let tdThing: TDThing = (await compact(ld, W3cWotTDContext as any)) as any;

      tdThing.base = urlJoin(this._rootUrl, `/things/${thing.id}`);

      tdThing = this._injectSecurity(tdThing);
      return tdThing;
    } catch (e) {
      e.message = `Failed to compact ${thing.id}: ${e.message}`;
      throw e;
    }
  }

  private _injectSecurity(thing: TDThing): TDThing {
    // TODO: Plugins should be able to offer security.  binding-express should probably handle this.
    thing.security = ["nosec"];
    thing.securityDefinitions = {
      nosec: {
        scheme: "nosec",
      },
    };
    return thing;
  }
}
