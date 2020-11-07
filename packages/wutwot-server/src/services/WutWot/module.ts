import { ContainerModule } from "microinject";
import { WutWot } from "@wutwot/core";

import { ExpressServientPlugin } from "@wutwot/servient-express";
import { ExpressBindingPlugin } from "@wutwot/binding-express";

import { Hostname, Port } from "../../config";

import { Endpoint } from "../Endpoint";

import { WutWotPlugin } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWot)
    .toFactory((context) => {
      const plugins = context.getAll(WutWotPlugin);

      const endpoint = context.get(Endpoint);
      const hostname = context.get(Hostname);
      const port = context.get(Port);
      plugins.push(
        new ExpressServientPlugin({
          router: endpoint.router,
          rootUrl: `http://${hostname}:${port}`,
        }),
        new ExpressBindingPlugin(),
      );

      return new WutWot(plugins);
    })
    .inSingletonScope();
});
