import { provides, singleton, inject, injectable } from "microinject";
import {
  WutWot,
  Thing,
  SchemaValidationError,
  ActionInvocationError,
  PropertySetError,
} from "@wutwot/core";
import {
  ExpressController,
  ExpressRootUrl,
} from "@wutwot/plugin-servient-express";
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
import keys from "lodash/keys";
import urlJoin from "url-join";

@injectable()
@singleton()
@provides(ExpressController)
@controller("/things")
@use(cors({ origin: "*" }), nocache())
export class ThingDirectoryController {
  constructor(
    @inject(WutWot) private _wutwot: WutWot,
    @inject(ExpressRootUrl) private _rootUrl: ExpressRootUrl,
  ) {}

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
      if (e instanceof ActionInvocationError) {
        throw createError(HttpStatusCodes.INTERNAL_SERVER_ERROR, e.message);
      }

      throw e;
    }
  }

  private async _getThingDefinition(thing: Thing): Promise<TDThing> {
    try {
      const ld = thing.toJSONLD();
      let tdThing: TDThing = (await compact(ld, W3cWotTDContext)) as any;

      tdThing.base = urlJoin(this._rootUrl, `/things/${thing.id}`);

      // TODO: wutwot core should handle forms
      tdThing = this._injectForms(tdThing);
      return tdThing;
    } catch (e) {
      e.message = `Failed to compact ${thing.id}: ${e.message}`;
      throw e;
    }
  }

  private _injectForms(thing: TDThing): TDThing {
    if (thing.properties) {
      const propertyKeys = keys(thing.properties);
      for (const propertyKey of propertyKeys) {
        const property = thing.properties[propertyKey];
        if (!property.forms) {
          property.forms = [];
        }

        if (!property.writeOnly) {
          property.forms.push({
            op: "readproperty",
            href: `/properties/${propertyKey}`,
          });

          if (!property.readOnly) {
            property.forms.push({
              op: "writeproperty",
              href: `/properties/${propertyKey}`,
            });
          }
        }
      }
    }

    if (thing.actions) {
      const actionKeys = keys(thing.actions);
      for (const actionKey of actionKeys) {
        const action = thing.actions[actionKey];
        if (!action.forms) {
          action.forms = [];
        }

        action.forms.push({
          op: "invokeaction",
          href: `/actions/${actionKey}`,
        });
      }
    }

    return thing;
  }
}
