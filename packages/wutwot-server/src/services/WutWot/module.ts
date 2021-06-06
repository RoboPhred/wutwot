import { ContainerModule } from "microinject";
import { WutWot } from "@wutwot/core";

import { ExpressServientPlugin } from "@wutwot/servient-express";

import { Hostname, Port } from "../../config";

import { Endpoint } from "../Endpoint";

import { WutWotPluginEnumeratorImpl } from "./impl/WutWotPluginEnumerator";
import { WutWotPluginEnumerator } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWotPluginEnumeratorImpl);
  bind(WutWot)
    .toFactory((context) => {
      const pluginEnumerator = context.get(WutWotPluginEnumerator);

      const plugins = pluginEnumerator.plugins;

      // FIXME: This should be a plugin!
      // Its currently not as it needs a live endpoint instance.
      // Make the express provider into a plugin, and make ExpressServientPlugin rely on it.
      const endpoint = context.get(Endpoint);
      const hostname = context.get(Hostname);
      const port = context.get(Port);
      plugins.push(
        new ExpressServientPlugin({
          router: endpoint.router,
          rootUrl: `http://${hostname}:${port}`,
        }),
      );

      return new WutWot(plugins);
    })
    .inSingletonScope();
});
