import { ContainerModule } from "microinject";
import { WutWot } from "@wutwot/core";

import { ExpressServientPlugin } from "@wutwot/servient-express";
import { ExpressBindingPlugin } from "@wutwot/binding-express";

import { WutWotPlugin } from "./identifiers";
import { Endpoint } from "../Endpoint/Endpoint";

export default new ContainerModule((bind) => {
  bind(WutWot)
    .toFactory((context) => {
      const plugins = context.getAll(WutWotPlugin);

      const endpoint = context.get(Endpoint);
      plugins.push(
        new ExpressServientPlugin({ router: endpoint.router }),
        new ExpressBindingPlugin(),
      );

      return new WutWot(plugins);
    })
    .inSingletonScope();
});
