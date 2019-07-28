import { injectable, inject } from "microinject";
import { MozIot } from "homectrl-moziot";
import createError from "http-errors";
import HttpStatusCodes from "http-status-codes";
import { has } from "lodash";

import { Restifier } from "../../../Restifier";
import { controller, get, put, param, body } from "../../../infrastructure";
import { getThingOrThrow, getPropertyOrThrow } from "../../../controller-utils";

@injectable()
@controller("/things/:thingId/properties/:propertyId")
export class PropertiesById {
  constructor(
    @inject(MozIot) private _mozIot: MozIot,
    @inject(Restifier) private _restifier: Restifier
  ) {}

  @get()
  public getProperties(
    @param("thingId") thingId: string,
    @param("propertyId") propertyId: string
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const property = getPropertyOrThrow(thing, propertyId);
    return {
      [propertyId]: property.value
    };
  }

  @put()
  public putPropertyValue(
    @param("thingId") thingId: string,
    @param("propertyId") propertyId: string,
    @body() body: any
  ) {
    const thing = getThingOrThrow(this._mozIot, thingId);
    const property = getPropertyOrThrow(thing, propertyId);
    if (!has(body, propertyId)) {
      throw createError(
        HttpStatusCodes.BAD_REQUEST,
        "The request body must contain an object mapping the property name to its intended value."
      );
    }
    const value = body[propertyId];
    property.setValue(value);
    return {
      [propertyId]: value
    };
  }
}
