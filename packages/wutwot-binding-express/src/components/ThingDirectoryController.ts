import { provides, singleton, inject, injectable } from "microinject";
import { WutWot, Thing, SchemaValidationError } from "@wutwot/core";
import { ExpressController } from "@wutwot/servient-express";
import { Thing as TDThing, W3cWotTDContext } from "@wutwot/td";
import HttpStatusCodes from "http-status-codes";
import {
  controller,
  get,
  pathParam,
  body,
  post,
} from "simply-express-controllers";
import { compact } from "jsonld";
import createError from "http-errors";
import keys from "lodash/keys";

@injectable()
@singleton()
@provides(ExpressController)
@controller("/things")
export class ThingDirectoryController {
  constructor(@inject(WutWot) private _wutwot: WutWot) {}

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

  @post("/:thingId/properties/:propertyId", {
    description: "Sets the value of a thing property",
    tags: ["Thing", "Property"],
  })
  async setThingProperty(
    @pathParam("thingId") thingId: string,
    @pathParam("propertyId") propertyId: string,
    @body() value: any,
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
      prop.setValue(value);
    } catch (e) {
      if (e instanceof SchemaValidationError) {
        throw createError(
          HttpStatusCodes.BAD_REQUEST,
          "Body did not match the property schema.",
        );
      }
      throw e;
    }

    // Doesn't appear to be any contract for the response.
    return {};
  }

  private async _getThingDefinition(thing: Thing): Promise<TDThing> {
    const ld = thing.toJSONLD();
    let tdThing: TDThing = (await compact(ld, W3cWotTDContext)) as any;

    // TODO: set base so form hrefs can be relative urls
    //  Need to get what our root address is, which should be something
    //  provided by servient-express

    // TODO: wutwot core should handle forms
    tdThing = this._injectForms(tdThing);
    return tdThing;
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
            href: `/${thing.id}/properties/${propertyKey}`,
          });

          if (!property.readOnly) {
            property.forms.push({
              op: "writeproperty",
              href: `/${thing.id}/properties/${propertyKey}`,
            });
          }
        }
      }
    }
    return thing;
  }
}
