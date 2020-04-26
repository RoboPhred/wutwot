import { provides, singleton, inject, injectable } from "microinject";
import { WutWot } from "@wutwot/core";
import { ExpressController } from "@wutwot/servient-express";
import { W3cWotContexts } from "@wutwot/td";
import { controller, get } from "simply-express-controllers";
import { compact } from "jsonld";

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
    const lds = things.map((thing) => thing.toJSONLD());
    const compressed = await Promise.all(
      lds.map((ld) => compact(ld, W3cWotContexts.ThingDefinition)),
    );
    return compressed;
  }
}
