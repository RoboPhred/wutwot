import { ContainerModule } from "microinject";
import { WutWot } from "@wutwot/core";

import { WutWotPluginEnumeratorImpl } from "./impl/WutWotPluginEnumerator";
import { WutWotPluginEnumerator } from "./identifiers";

export default new ContainerModule((bind) => {
  bind(WutWotPluginEnumeratorImpl);
  bind(WutWot)
    .toFactory((context) => {
      const pluginEnumerator = context.get(WutWotPluginEnumerator);

      const plugins = pluginEnumerator.plugins;
      return new WutWot(plugins);
    })
    .inSingletonScope();
});
